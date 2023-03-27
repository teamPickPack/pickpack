package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.dto.IsNewDto;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class ChatMessageRepository implements Serializable {
    private static final String CHAT_MESSAGES = "CHAT_MESSAGES";
    private final RedisTemplate<String, Object> redisTemplate;
    private final JdbcTemplate jdbcTemplate;

    private final DbChatMessageRepository dbChatMessageRepository;
    private HashOperations<String, String, List<RedisChatMessage>> opsHashChatMessage;

    @PostConstruct
    private void init() {

        opsHashChatMessage = redisTemplate.opsForHash();
    }
    /**
     * message를 redis에 저장하는 메소드
     * .haskey를 이용해 NullPointerException 회피
     *
     * @param message
     */
    public void createMessage(RedisChatMessage message) {
        List<RedisChatMessage> list;
        if (!opsHashChatMessage.hasKey(CHAT_MESSAGES, message.getRoomId())) {
            list = new ArrayList<>();
        } else {
            list = opsHashChatMessage.get(CHAT_MESSAGES, message.getRoomId());
        }
        list.add(message);
        opsHashChatMessage.put(CHAT_MESSAGES, message.getRoomId(), list);
    }

    /**
     *
     * 채팅룸 id를 통해 메시지 리스트들 가져오기
     * @param roomId
     * @return List<ChatMessage>
     */
    public List<RedisChatMessage> findMessage(String roomId) {
        return opsHashChatMessage.get(CHAT_MESSAGES, roomId);
    }

    //마지막 메시지 주기
    public IsNewDto findSizeAndLastMessage(String roomId){
        if(opsHashChatMessage.hasKey(CHAT_MESSAGES,roomId)){
            return IsNewDto.create(opsHashChatMessage.get(CHAT_MESSAGES,roomId));
        }else{
            return null;
        }
    }
    public void receiveMessageFromDB(){

    }
    //TODO ChatRoom 먼저 박고나서 시작해야됨
    @Async
//    @Scheduled(cron = "0 0/1 * * * *")
    public int[][] sendMessageToDB(){
        Map<String,List<RedisChatMessage>> map = opsHashChatMessage.entries(CHAT_MESSAGES);
        Iterator<String>mapIter = map.keySet().iterator();
        List<RedisChatMessage> allMessageList = new ArrayList<>();
        while(mapIter.hasNext()){
            String key = mapIter.next();
            List<RedisChatMessage> iterMessageList = map.get(key);
            if(iterMessageList.isEmpty()) continue;
            Collections.addAll(allMessageList, iterMessageList.toArray(new RedisChatMessage[0]));
        }
        int[][] batchStatus = jdbcTemplate.batchUpdate
                ("INSERT IGNORE INTO chat_message(room_id,type,sender_name,message,time) VALUES (?,?,?,?,?);",
                        allMessageList,
                        allMessageList.size(),
                        new ParameterizedPreparedStatementSetter<RedisChatMessage>() {
                            @Override
                            public void setValues(PreparedStatement ps, RedisChatMessage chatMessage) throws SQLException {
                                ps.setString(1, chatMessage.getRoomId());
                                ps.setString(2,chatMessage.getType().name());
                                ps.setString(3, chatMessage.getSender());
                                ps.setString(4,chatMessage.getMessage());
                                ps.setString(5,chatMessage.getTime().toString()+chatMessage.getSender());
                            }
                        }
                );
        System.out.println(batchStatus[0].length);
        System.out.println(batchStatus.length);
        //TODO 다시 살려야됨
//        redisTemplate.delete(CHAT_MESSAGES);
        log.info("삭제되었는가? : {}",redisTemplate.hasKey(CHAT_MESSAGES));
        return batchStatus;
    }

}
