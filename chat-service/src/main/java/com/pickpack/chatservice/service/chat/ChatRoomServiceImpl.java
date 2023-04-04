package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.CreateRoomReqDto;
import com.pickpack.chatservice.dto.GetRoomDto;
import com.pickpack.chatservice.dto.IsNewDto;
import com.pickpack.chatservice.entity.ChatRoom;
import com.pickpack.chatservice.entity.Item;
import com.pickpack.chatservice.entity.Member;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import com.pickpack.chatservice.repo.redis.RedisChatMessageRepository;
import com.pickpack.chatservice.repo.redis.RedisChatRoomRepository;
import com.pickpack.chatservice.repo.ChatRoomRepository;
import com.pickpack.chatservice.repo.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class ChatRoomServiceImpl implements ChatRoomService{
    private final ItemRepository itemRepository;
    private final RedisChatRoomRepository redisChatRoomRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final RedisChatMessageRepository redisChatMessageRepository;
    private final ChatMessageService chatMessageService;


    @Override
    public void saveRedisChatRoom(RedisChatRoom redisChatRoom, String nickname) {
        List<RedisChatRoom> redisChatRoomList = redisChatRoomRepository.findRoomsByNickname(nickname)
                .orElseGet(ArrayList::new);
        redisChatRoomList.add(redisChatRoom);
        log.info("redischatRoom :{}, nickname: {}",redisChatRoom,nickname);
        redisChatRoomRepository.saveRoomList(nickname,redisChatRoomList);
    }
    @Override
    public RedisChatRoom createChatRoom(CreateRoomReqDto createRoomReqDto) {
        Item item = itemRepository.findItemById(createRoomReqDto.getItemId());

        Optional<List<RedisChatRoom>> list =redisChatRoomRepository.findRoomsByNickname(createRoomReqDto.getBuyer());
        if(list.isPresent()) {
            for(RedisChatRoom redisChatRoom:list.get()){
                if(redisChatRoom.getItemId()==createRoomReqDto.getItemId()){
                    log.info(redisChatRoom.getRoomId());
                    return redisChatRoom;
                }
            }
        }

        RedisChatRoom redisChatRoom = RedisChatRoom.builder()
                //db에 roomid로 정렬이됨
                .roomId(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"))
                        + UUID.randomUUID())
                .buyer(createRoomReqDto.getBuyer())
                .imgUrl(item.getImgUrl())
                .itemId(createRoomReqDto.getItemId())
                .itemName(item.getItemName())
                .seller(createRoomReqDto.getSeller())
                .lastMessage("채팅을 해보세요!")
                .messageSize(0)
                .lastMessageTime(LocalDateTime.now())
                .build();

        log.info("RedisChatRoom이다 :{}",redisChatRoom.getRoomId());
        saveRedisChatRoom(redisChatRoom, redisChatRoom.getSeller());
        saveRedisChatRoom(redisChatRoom, redisChatRoom.getBuyer());

        return redisChatRoom;
    }
    @Override
    public void updateRoomStatus(RedisChatRoom redisChatRoom) {
        IsNewDto isNewDto = redisChatMessageRepository.findSizeAndLastMessage(redisChatRoom.getRoomId());
        if (isNewDto != null) redisChatRoom.change(isNewDto);
    }

    @Override
    public List<GetRoomDto> findRoomById(String nickname) {
        List<RedisChatRoom> list =redisChatRoomRepository.findRoomsByNickname(nickname)
                        .orElseGet(ArrayList::new);
        log.info("list의 size : {}", list.size());
        List<GetRoomDto> getRoomDtoList = new ArrayList<>();
        int idx=0;
        //너가 채팅방을 들어선다면 last message 줄거고, 그게 너가 알고있는게 아니면? 최신인거야
        for (RedisChatRoom cr : list) {
            log.info(idx+" update전의 messageSize : {}, lastMessage : {}",cr.getMessageSize(),cr.getLastMessage());
            updateRoomStatus(cr);
            log.info(idx+" update후의 messageSize : {}, lastMessage : {}",cr.getMessageSize(),cr.getLastMessage());
            getRoomDtoList.add(new GetRoomDto().chatRoomToGetRoomDto(cr, nickname));
        }
        redisChatRoomRepository.saveRoomList(nickname,list);
        return getRoomDtoList;
    }

    @Override
    @Scheduled(cron = "0 0/10 * * * *")
    public void sendRoomToDB() {
        //TODO entries 대신 scan을 사용해보는것
        Map<String, List<RedisChatRoom>> map = redisChatRoomRepository.findAllRoomByKey()
                .orElseThrow(()-> new NoSuchElementException("채팅방이 하나도 없습니다."));
        Iterator<String> mapIter = map.keySet().iterator();
        ;
        List<RedisChatRoom> allRoomList = new ArrayList<>();
        while (mapIter.hasNext()) {
            String key = mapIter.next();
            List<RedisChatRoom> iterRoomList = map.get(key);
            if (iterRoomList.isEmpty()) continue;
            Collections.addAll(allRoomList, iterRoomList.toArray(new RedisChatRoom[0]));
        }
        redisChatRoomRepository.writeRoomFromRedisToDB(allRoomList);
        redisChatRoomRepository.deleteAllRoom();
        redisChatRoomWarming();
        chatMessageService.sendMessageToDB();
    }


    @Override
    public void redisChatRoomWarming() {
        //유효한 room들 다 넣어주자
        Optional<List<ChatRoom>> chatRoomList = chatRoomRepository.findAllValidRooms();
        if(!chatRoomList.isPresent()) return;

        Map<String, List<RedisChatRoom>> map = new HashMap<>();
        for (ChatRoom chatRoom : chatRoomList.get()) {
            Item item = chatRoom.getItem();

            RedisChatRoom redisChatRoom = RedisChatRoom.builder()
                    .roomId(chatRoom.getRoomId())
                    .itemId(item.getId())
                    .itemName(item.getItemName())
                    .imgUrl(item.getImgUrl())
                    .seller(chatRoom.getSeller())
                    .buyer(chatRoom.getBuyer())
                    .messageSize(chatRoom.getMessageSize())
                    .lastMessage(chatRoom.getLastMessage())
                    .lastMessageTime(chatRoom.getLastMessageTime().toLocalDateTime())
                    .isNew(chatRoom.isNew())
                    .build();

            //seller꺼
            List<RedisChatRoom>sellerList = map.getOrDefault(redisChatRoom.getSeller(),new ArrayList<>());
            sellerList.add(redisChatRoom);
            map.put(redisChatRoom.getSeller(),sellerList);

            //buyer꺼
            List<RedisChatRoom>buyerList = map.getOrDefault(redisChatRoom.getBuyer(),new ArrayList<>());
            buyerList.add(redisChatRoom);
            map.put(redisChatRoom.getBuyer(),buyerList);
        }
        redisChatRoomRepository.saveRoomsMap(map);
    }
}
