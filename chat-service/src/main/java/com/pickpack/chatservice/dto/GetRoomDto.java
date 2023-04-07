package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class GetRoomDto {
    private String chatRoomId;
    private Long itemId;
    private String imgUrl;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private String nickName;
    private boolean isNew;
    private String lastWriter;

    public GetRoomDto chatRoomToGetRoomDto(RedisChatRoom redisChatRoom, String memberId){
        GetRoomDto getRoomDto = new GetRoomDto();
        getRoomDto.chatRoomId= redisChatRoom.getRoomId();
        getRoomDto.itemId= redisChatRoom.getItemId();
        getRoomDto.imgUrl= redisChatRoom.getImgUrl();
        getRoomDto.lastMessageTime=redisChatRoom.getLastMessageTime();
        getRoomDto.lastMessage= redisChatRoom.getLastMessage();
        getRoomDto.isNew= redisChatRoom.isNew();
        getRoomDto.nickName = redisChatRoom.getSeller().equals(memberId)? redisChatRoom.getBuyer(): redisChatRoom.getSeller();
        getRoomDto.lastWriter=redisChatRoom.getLastWriter();
        return getRoomDto;
    }
}
