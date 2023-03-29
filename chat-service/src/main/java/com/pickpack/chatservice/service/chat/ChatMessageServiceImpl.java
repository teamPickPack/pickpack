package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.entity.ChatMessage;
import com.pickpack.chatservice.entity.ChatRoom;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.repo.redis.RedisChatMessageRepository;
import com.pickpack.chatservice.repo.redis.RedisChatRoomRepository;
import com.pickpack.chatservice.repo.ChatMessageRepository;
import com.pickpack.chatservice.repo.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageServiceImpl implements ChatMessageService{
    private final RedisChatRoomRepository RedisChatRoomRepository;
    private final RedisChatMessageRepository redisChatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    public void createMessage(RedisChatMessage message) {
        //roomid와 sender로 room수정
        //TODO 아 이거 뭔데~~~~~~~~~~~~~~~~~
        RedisChatRoomRepository.updateRoomTime(message.getSender(), message.getRoomId(), message.getTime(),false);

        List<RedisChatMessage> list;
        if (!redisChatMessageRepository.isHasKeyOnChatMessage(message.getRoomId())){
            list = new ArrayList<>();
        } else {
            list = redisChatMessageRepository.findMessagesByRoomId(message.getRoomId());
        }
        list.add(message);
        redisChatMessageRepository.saveMessageList(message.getRoomId(), list);
    }


    //TODO ChatRoom 먼저 박고나서 시작해야됨
    @Async
//    @Scheduled(cron = "0 0/1 * * * *")
    public void sendMessageToDB() {
        Map<String, List<RedisChatMessage>> map = redisChatMessageRepository.findAllMessagesByKey();
        Iterator<String> mapIter = map.keySet().iterator();

        List<RedisChatMessage> allMessageList = new ArrayList<>();

        while (mapIter.hasNext()) {
            String key = mapIter.next();
            List<RedisChatMessage> iterMessageList = map.get(key);
            if (iterMessageList.isEmpty()) continue;
            Collections.addAll(allMessageList, iterMessageList.toArray(new RedisChatMessage[0]));
        }

        int[][] batchStatus = redisChatMessageRepository.writeMessageFromRedisToDB(allMessageList);
        redisChatMessageRepository.deleteMessageKey();
    }


    //TODO cron redisChatroomWarming후에 되도록
    public void redisChatMessageWarming() {
        //유효한 room들
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllValidRooms();
        LocalDateTime cursorDate = LocalDateTime.now().minusDays(3);
        Timestamp cursor = Timestamp.valueOf(cursorDate);

        log.info("cursordate(7일전) ;{}",cursorDate);
        Map<String, List<RedisChatMessage>> map = new HashMap<>();
        for(ChatRoom chatRoom :chatRoomList){
            List<ChatMessage> chatMessageList = chatMessageRepository.findChatMessagesByTimeAfterAndChatRoomOrderByTime(cursor,chatRoom);
            List<RedisChatMessage> redisChatMessageList=new ArrayList<>();
            for(ChatMessage chatMessage:chatMessageList){
                redisChatMessageList.add(RedisChatMessage.convertToRedisChatMessage(chatMessage));
            }
            map.put(chatRoom.getRoomId(),redisChatMessageList);
        }
        redisChatMessageRepository.saveMessagesMap(map);
    }
}
