package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.dto.CreateRoomDto;
import com.pickpack.chatservice.dto.GetRoomDto;
import com.pickpack.chatservice.dto.IsNewDto;
import com.pickpack.chatservice.entity.ChatRoom;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatRoomRepository {
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private final JdbcTemplate jdbcTemplate;
    private HashOperations<String, String, List<RedisChatRoom>> opsHashChatRoom;
    private final ChatMessageRepository chatMessageRepository;
    private final DbChatRoomRepository dbChatRoomRepository;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
    }

    public RedisChatRoom createChatRoom(CreateRoomDto createRoomDto) {
        RedisChatRoom redisChatRoom = RedisChatRoom.builder()
                .roomId(UUID.randomUUID().toString())
                .buyer(createRoomDto.getBuyer())

                .imgUrl("그냥 test")
                //TODO 나중에 아이템에서 가져와야됨
//                .imgUrl(itemRepository.findImgUrlById(createRoomDto.getItemId()))
                .itemId(createRoomDto.getItemId())
                .itemName(createRoomDto.getItemName())
                .seller(createRoomDto.getSeller())
                //TODO new message에 대한 논의
                .lastMessage("채팅을 해보세요!")
                .messageSize(0)
                .build();
        insertRoom(redisChatRoom, redisChatRoom.getSeller());
        insertRoom(redisChatRoom, redisChatRoom.getBuyer());
        return redisChatRoom;
    }

    private void insertRoom(RedisChatRoom redisChatRoom, String memberId) {
        List<RedisChatRoom> redisChatRoomList;
        if(!opsHashChatRoom.hasKey(CHAT_ROOMS,memberId)){
            redisChatRoomList = new ArrayList<>();
        }else{
            redisChatRoomList = opsHashChatRoom.get(CHAT_ROOMS,memberId);
        }
        redisChatRoomList.add(redisChatRoom);
        opsHashChatRoom.put(CHAT_ROOMS, memberId, redisChatRoomList);
    }
    //TODO 최신화하는 과정을 다른데도 써먹어. 근데 이거 안될거같다.
    public void updateRoomStatus(RedisChatRoom redisChatRoom){
        IsNewDto isNewDto=chatMessageRepository.findSizeAndLastMessage(redisChatRoom.getRoomId());
        if(isNewDto==null)return;
        redisChatRoom.change(isNewDto);
    }
    public List<GetRoomDto> findRoomById(String memberId){
        List<RedisChatRoom> list = opsHashChatRoom.get(CHAT_ROOMS,memberId);
        System.out.println(opsHashChatRoom.get(CHAT_ROOMS,"user1"));
        System.out.println(1);
        if(list==null) return new ArrayList<>();
        System.out.println(2);

        List<GetRoomDto> getRoomDtoList = new ArrayList<>();
        System.out.println(3);

        for(RedisChatRoom cr : list) {
            updateRoomStatus(cr);
            getRoomDtoList.add(new GetRoomDto().chatRoomToGetRoomDto(cr,memberId));
        }
        System.out.println(4);

        opsHashChatRoom.put(CHAT_ROOMS,memberId,list);
        return getRoomDtoList;
    }
    //TODO cron 바꿔라
    @Async
//    @Scheduled(cron = "0 0/1 * * * *")
    public int[][] sendRoomToDB(){
        Map<String,List<RedisChatRoom>> map = opsHashChatRoom.entries(CHAT_ROOMS);
        Iterator<String>mapIter = map.keySet().iterator();
        List<RedisChatRoom> allRoomList = new ArrayList<>();
        while(mapIter.hasNext()){
            String key = mapIter.next();
            List<RedisChatRoom> iterRoomList = map.get(key);
            //TODO 다 팔린 톡방은 삭제해야되지 않을까?
            if(iterRoomList.isEmpty()) continue;
            Collections.addAll(allRoomList, iterRoomList.toArray(new RedisChatRoom[0]));
        }
        //TODO on duplicate key update
        int[][] batchStatus = jdbcTemplate.batchUpdate
                ("INSERT IGNORE INTO chat_room(room_id,item_id,seller_name,buyer_name,message_size,last_message,is_new) VALUES (?,?,?,?,?,?,?);",
                        allRoomList,
                        allRoomList.size(),
                        new ParameterizedPreparedStatementSetter<RedisChatRoom>() {
                            @Override
                            public void setValues(PreparedStatement ps, RedisChatRoom chatRoom) throws SQLException {
                                ps.setString(1,chatRoom.getRoomId());
                                ps.setLong(2,chatRoom.getItemId());
                                ps.setString(3,chatRoom.getSeller());
                                ps.setString(4, chatRoom.getBuyer());
                                ps.setLong(5,chatRoom.getMessageSize());
                                ps.setString(6, chatRoom.getLastMessage());
                                ps.setBoolean(7, chatRoom.isNew());
                            }
                        }
                );

        System.out.println(batchStatus[0].length);
        System.out.println(batchStatus.length);
        //TODO 다시 살려야됨
//        redisTemplate.delete(CHAT_ROOMS);
        log.info("삭제되었는가? : {}",redisTemplate.hasKey(CHAT_ROOMS));
        return batchStatus;
    }
    //TODO 111111로 할거
//    public void redisChatRoomWarming(){
//        List<ChatRoom>chatRoomList= dbChatRoomRepository.findAllValidRooms();
//        Map<String,List<ChatRoom>> map = new HashMap<>();
//        for(ChatRoom chatRoom:chatRoomList){
//            map.
//            map.get(chatRoom.getBuyer())
//            map.put(chatRoom.getBuyer(),new)
//        }
//    }
//    public void
}
