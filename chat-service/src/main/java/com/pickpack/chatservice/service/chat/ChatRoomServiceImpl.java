package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.CreateRoomDTO;
import com.pickpack.chatservice.dto.GetRoomDTO;
import com.pickpack.chatservice.dto.IsNewDTO;
import com.pickpack.chatservice.entity.ChatRoom;
import com.pickpack.chatservice.entity.Item;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import com.pickpack.chatservice.repo.redis.RedisChatMessageRepository;
import com.pickpack.chatservice.repo.redis.RedisChatRoomRepository;
import com.pickpack.chatservice.repo.ChatRoomRepository;
import com.pickpack.chatservice.repo.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
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
        List<RedisChatRoom> redisChatRoomList;
        //TODO optional 처리를 해볼까
        if (!redisChatRoomRepository.isHasKeyOnChatRoom(nickname)) {
            redisChatRoomList = new ArrayList<>();
        } else {
            redisChatRoomList = redisChatRoomRepository.findRoomsByNickname(nickname);
        }
        redisChatRoomList.add(redisChatRoom);
        log.info("redischatRoom :{}, nickname: {}",redisChatRoom,nickname);
        redisChatRoomRepository.saveRoomList(nickname,redisChatRoomList);
    }
    @Override
    public RedisChatRoom createChatRoom(CreateRoomDTO createRoomDto) {
        Item item = itemRepository.findItemById(createRoomDto.getItemId());

        RedisChatRoom redisChatRoom = RedisChatRoom.builder()
                //db에 roomid로 정렬이됨
                .roomId(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"))
                        + UUID.randomUUID().toString())
                .buyer(createRoomDto.getBuyer())
                .imgUrl(item.getImgUrl())
                .itemId(createRoomDto.getItemId())
                .itemName(item.getItemName())
                .seller(createRoomDto.getSeller())
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
        IsNewDTO isNewDto = redisChatMessageRepository.findSizeAndLastMessage(redisChatRoom.getRoomId());
        if (isNewDto != null) redisChatRoom.change(isNewDto);
    }

    @Override
    public List<GetRoomDTO> findRoomById(String nickname) {
        List<RedisChatRoom> list;
        if (redisChatRoomRepository.findRoomsByNickname(nickname)== null)
            list = new ArrayList<>();
        else
            list = redisChatRoomRepository.findRoomsByNickname(nickname);
        log.info("list의 size : {}", list.size());

        List<GetRoomDTO> getRoomDTOList = new ArrayList<>();
        int idx=0;
        //너가 채팅방을 들어선다면 last message 줄거고, 그게 너가 알고있는게 아니면? 최신인거야
        for (RedisChatRoom cr : list) {
            log.info(idx+" update전의 messageSize : {}, lastMessage : {}",cr.getMessageSize(),cr.getLastMessage());
            updateRoomStatus(cr);
            log.info(idx+" update후의 messageSize : {}, lastMessage : {}",cr.getMessageSize(),cr.getLastMessage());
            getRoomDTOList.add(new GetRoomDTO().chatRoomToGetRoomDto(cr, nickname));
        }
        redisChatRoomRepository.saveRoomList(nickname,list);
        return getRoomDTOList;
    }

    /**
     * RedisChatRoom을 Scheduleling(Redis->MySQL)
     * @return int[][]
     */
    @Override
//    @Scheduled(cron = "0 0 3 * * *")
    public void sendRoomToDB() {
        //TODO entries 대신 scan을 사용해보는것
        Map<String, List<RedisChatRoom>> map = redisChatRoomRepository.findAllRoomByKey();
        Iterator<String> mapIter = map.keySet().iterator();
        ;
        List<RedisChatRoom> allRoomList = new ArrayList<>();
        while (mapIter.hasNext()) {
            String key = mapIter.next();
            System.out.println(key);
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
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllValidRooms();
        Map<String, List<RedisChatRoom>> map = new HashMap<>();
        for (ChatRoom chatRoom : chatRoomList) {
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
            List<RedisChatRoom>list;
            if(map.get(redisChatRoom.getSeller())==null){
                list = new ArrayList<>();
            }else{
                list = map.get(redisChatRoom.getSeller());
            }
            list.add(redisChatRoom);
            map.put(redisChatRoom.getSeller(),list);

            //buyer꺼
            if(map.get(redisChatRoom.getBuyer())==null){
                list = new ArrayList<>();
            }else{
                list = map.get(redisChatRoom.getBuyer());
            }
            list.add(redisChatRoom);
            map.put(redisChatRoom.getBuyer(),list);
        }
        redisChatRoomRepository.saveRoomsMap(map);
    }
}
