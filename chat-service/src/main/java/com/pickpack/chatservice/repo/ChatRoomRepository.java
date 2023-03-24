package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.dto.CreateRoomDto;
import com.pickpack.chatservice.dto.GetRoomDto;
import com.pickpack.chatservice.dto.IsNewDto;
import com.pickpack.chatservice.entity.redis.ChatMessage;
import com.pickpack.chatservice.entity.redis.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChatRoomRepository {
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, List<ChatRoom>> opsHashChatRoom;
    private final ChatMessageRepository chatMessageRepository;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
    }

    public ChatRoom createChatRoom(CreateRoomDto createRoomDto) {
        ChatRoom chatRoom = ChatRoom.builder()
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
        insertRoom(chatRoom,chatRoom.getSeller());
        insertRoom(chatRoom,chatRoom.getBuyer());
        return chatRoom;
    }

    private void insertRoom(ChatRoom chatRoom, String memberId) {
        List<ChatRoom> chatRoomList;
        if(!opsHashChatRoom.hasKey(CHAT_ROOMS,memberId)){
            chatRoomList = new ArrayList<>();
        }else{
            chatRoomList= opsHashChatRoom.get(CHAT_ROOMS,memberId);
        }
        chatRoomList.add(chatRoom);
        opsHashChatRoom.put(CHAT_ROOMS, memberId,chatRoomList);
    }
    //TODO 최신화하는 과정을 다른데도 써먹어. 근데 이거 안될거같다.
    public void updateRoomStatus(ChatRoom chatRoom){
        IsNewDto isNewDto=chatMessageRepository.findSizeAndLastMessage(chatRoom.getRoomId());
        if(isNewDto==null)return;
        chatRoom.change(isNewDto);
    }
    public List<GetRoomDto> findRoomById(String memberId){
        List<ChatRoom> list = opsHashChatRoom.get(CHAT_ROOMS,memberId);
        System.out.println(opsHashChatRoom.get(CHAT_ROOMS,"user1"));
        System.out.println(1);
        if(list==null) return new ArrayList<>();
        System.out.println(2);

        List<GetRoomDto> getRoomDtoList = new ArrayList<>();
        System.out.println(3);

        for(ChatRoom cr : list) {
            updateRoomStatus(cr);
            getRoomDtoList.add(new GetRoomDto().chatRoomToGetRoomDto(cr,memberId));
        }
        System.out.println(4);

        opsHashChatRoom.put(CHAT_ROOMS,memberId,list);
        return getRoomDtoList;
    }
}
