package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.ChatPagingResDTO;
import com.pickpack.chatservice.entity.ChatMessage;
import com.pickpack.chatservice.entity.ChatRoom;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.repo.redis.RedisChatMessageRepository;
import com.pickpack.chatservice.repo.redis.RedisChatRoomRepository;
import com.pickpack.chatservice.repo.ChatMessageRepository;
import com.pickpack.chatservice.repo.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageServiceImpl implements ChatMessageService {
    private final RedisChatRoomRepository redisChatRoomRepository;
    private final RedisChatMessageRepository redisChatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Override
    public void createMessage(RedisChatMessage message) {
        //roomid와 sender로 room수정
        //updateroomtime바로 때려버리면 안됨

        redisChatRoomRepository.updateRoomTime(message.getSender(), message.getRoomId(), message.getTime(), false);

        log.info("updateRoomTime(sender:{},roomid:{},time:{}", message.getSender(), message.getRoomId(), message.getTime());
        List<RedisChatMessage> list;
        if (!redisChatMessageRepository.isHasKeyOnChatMessage(message.getRoomId())) {
            list = new ArrayList<>();
        } else {
            list = redisChatMessageRepository.findMessagesByRoomId(message.getRoomId());
        }
        list.add(message);
        redisChatMessageRepository.saveMessageList(message.getRoomId(), list);
        System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    }


    public List<ChatMessage> fillRedisChatMessage(String roomId, LocalDate page, int day){
        LocalDateTime startDate = LocalDateTime.of(page.minusDays(day),LocalTime.MIDNIGHT);
        LocalDateTime endDate = LocalDateTime.of(page,LocalTime.MIDNIGHT);

        Timestamp start = Timestamp.valueOf(startDate);
        Timestamp end = Timestamp.valueOf(endDate);

        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow();
        List<ChatMessage> chatMessageList = chatMessageRepository.findChatMessagesByTimeBetweenAndChatRoomOrderByTime(start,end, chatRoom)
                .orElseGet(()->fillRedisChatMessage(roomId,page,day+1));

        List<RedisChatMessage> newChatMessageList = new ArrayList<>();

        for (ChatMessage chatMessage : chatMessageList) {
            newChatMessageList.add(RedisChatMessage.convertToRedisChatMessage(chatMessage));
        }
        redisChatMessageRepository.saveMessageList(roomId,newChatMessageList);
        //필요없는딩
        return chatMessageList;
    }


    //TODO 먹는지 확인 하자
    @Override
    public ChatPagingResDTO getMessages(String roomId, LocalDate page) {
        //slice는 필요가 없는 것 같다. 캐시를 쓰는데 뭘..
        List<RedisChatMessage> redisChatMessageList = redisChatMessageRepository.findMessagesByRoomId(roomId);
        if(!redisChatMessageList.get(0).getTime().toLocalDate().equals(page)){
            fillRedisChatMessage(roomId,page,1);
        }
        ChatPagingResDTO chatPagingResDTO = ChatPagingResDTO.messageListToDto(redisChatMessageList);
        return chatPagingResDTO;
    }



    @Override
    @Async
    @Scheduled(cron = "0 0 * * * *")
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

        redisChatMessageRepository.writeMessageFromRedisToDB(allMessageList);
        redisChatMessageRepository.deleteAllMessage();
        redisChatMessageWarming();
    }

    @Override
    public void redisChatMessageWarming() {
        //유효한 room들
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllValidRooms();
//        LocalDateTime cursorDate = LocalDateTime.of(2023, 3, 29, 21, 56);
        LocalDateTime cursorDate = LocalDateTime.of(LocalDate.now().minusDays(1),LocalTime.MIDNIGHT);
        Timestamp cursor = Timestamp.valueOf(cursorDate);

        log.info("cursordate(7일전) ;{}", cursorDate);
        Map<String, List<RedisChatMessage>> map = new HashMap<>();
        for (ChatRoom chatRoom : chatRoomList) {
            List<ChatMessage> chatMessageList = chatMessageRepository.findChatMessagesByTimeAfterAndChatRoomOrderByTime(cursor, chatRoom);
            List<RedisChatMessage> redisChatMessageList = new ArrayList<>();
            for (ChatMessage chatMessage : chatMessageList) {
                redisChatMessageList.add(RedisChatMessage.convertToRedisChatMessage(chatMessage));
            }
            map.put(chatRoom.getRoomId(), redisChatMessageList);
        }
        redisChatMessageRepository.saveMessagesMap(map);
    }
}
