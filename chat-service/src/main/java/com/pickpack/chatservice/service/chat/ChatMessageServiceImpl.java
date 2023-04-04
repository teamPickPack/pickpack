package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.ChatPagingResDto;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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

        List<RedisChatMessage> list = redisChatMessageRepository.findMessagesByRoomId(message.getRoomId())
                .orElseGet(ArrayList::new);
        list.add(message);
        redisChatMessageRepository.saveMessageList(message.getRoomId(), list);
    }


    public List<ChatMessage> fillRedisChatMessage(String roomId, LocalDate page, int day) {
        Optional<ChatMessage> tchatMessage = chatMessageRepository.findTop1ById(roomId);
        if(!tchatMessage.isPresent())return null;
        if(tchatMessage.get().getTime()
                .after(Timestamp.valueOf(LocalDateTime.of(page, LocalTime.MIDNIGHT)))) return null;

        LocalDateTime startDate = LocalDateTime.of(page.minusDays(day), LocalTime.MIDNIGHT);
        LocalDate date = (page.equals(LocalDate.now()))?page.plusDays(1):page;
        LocalDateTime endDate = LocalDateTime.of(date, LocalTime.MIDNIGHT);

        Timestamp start = Timestamp.valueOf(startDate);
        Timestamp end = Timestamp.valueOf(endDate);

        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow();

//        Timestamp firstTime = chatMessageRepository.findTop1ById(roomId).getTime();
//        log.info("firstTime:{}",firstTime);

        //TODO 계속들어갈까?
        List<ChatMessage> chatMessageList = chatMessageRepository.findChatMessagesByTimeBetweenAndChatRoomOrderByTime(start, end, chatRoom)
                .orElseGet(() -> fillRedisChatMessage(roomId, page, day + 1));

        if (chatMessageList == null) return null;

        List<RedisChatMessage> newChatMessageList = new ArrayList<>();

        for (ChatMessage chatMessage : chatMessageList) {
            newChatMessageList.add(RedisChatMessage.convertToRedisChatMessage(chatMessage));
        }
        redisChatMessageRepository.saveMessageList(roomId, newChatMessageList);
        //TODO 필요없는딩
        return chatMessageList;
    }


    //TODO 먹는지 확인 하자
    @Override
    public ChatPagingResDto getMessages(String roomId, LocalDate date) {

            Optional<List<RedisChatMessage>> redisChatMessageList
                    = redisChatMessageRepository.findMessagesByRoomId(roomId);
        if (redisChatMessageList.isEmpty()) {
            fillRedisChatMessage(roomId, date, 1);
            redisChatMessageList = redisChatMessageRepository.findMessagesByRoomId(roomId);
        }
        return ChatPagingResDto.messageListToDto(redisChatMessageList.orElseGet(null));

        //slice는 필요가 없는 것 같다. 캐시를 쓰는데 뭘..

        //date가 오늘날짜면 초출이다
        //그게 아니라면 새로달라고 찡찡.
        //만약에 오늘이 4월 4일이고, 4월 3일 00시부터 메시지가 없었다면, null이다.
        //4월 3일 00시부터 메시지가 하나라도 있었다면 그대로 보내주기!
        //근데 없다? 더 가져와. 근데 진짜 없는거랑 새로 가져올거랑 어떻게 판단을 할까?
        // 진짜 없는거 -> null이고 날짜는 오늘 날짜, 새로 가져올거는? 현재 가지고 있는 메시지 리스튿르의 get(0)의 날짜보다 하나 더 적게!
    }


    @Override
    @Async
//    @Scheduled(cron = "0 0 * * * *")
    public void sendMessageToDB() {
        Map<String, List<RedisChatMessage>> map = redisChatMessageRepository.findAllMessagesByKey()
                .orElseThrow(()->new NoSuchElementException("message가 단 하나도 없습니다."));
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
        Optional<List<ChatRoom>> chatRoomList = chatRoomRepository.findAllValidRooms();
        if(chatRoomList.isEmpty()) return;
//        LocalDateTime cursorDate = LocalDateTime.of(2023, 3, 29, 21, 56);
        //4월 4일에 돌았다면 4월 3일 00시부터의 메시지들을 담는다.
        LocalDateTime cursorDate = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.MIDNIGHT);
        Timestamp cursor = Timestamp.valueOf(cursorDate);

        log.info("cursordate(7일전) ;{}", cursorDate);
        Map<String, List<RedisChatMessage>> map = new HashMap<>();
        for (ChatRoom chatRoom : chatRoomList.get()) {
            List<ChatMessage> chatMessageList =
                    chatMessageRepository.findChatMessagesByTimeAfterAndChatRoomOrderByTime(cursor, chatRoom)
                            .orElseGet(ArrayList::new);
            List<RedisChatMessage> redisChatMessageList = new ArrayList<>();
            for (ChatMessage chatMessage : chatMessageList) {
                redisChatMessageList.add(RedisChatMessage.convertToRedisChatMessage(chatMessage));
            }
            map.put(chatRoom.getRoomId(), redisChatMessageList);
        }
        redisChatMessageRepository.saveMessagesMap(map);
    }
}
