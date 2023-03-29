package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class GetRoomDTO {
    private String chatRoomId;
    private Long itemId;
    private String imgUrl;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private String nickName;
    private boolean isNew;

    public GetRoomDTO chatRoomToGetRoomDto(RedisChatRoom redisChatRoom, String memberId){
        GetRoomDTO getRoomDto = new GetRoomDTO();
        getRoomDto.chatRoomId= redisChatRoom.getRoomId();
        getRoomDto.itemId= redisChatRoom.getItemId();
        getRoomDto.imgUrl= redisChatRoom.getImgUrl();
        getRoomDto.lastMessageTime=redisChatRoom.getLastMessageTime();
        getRoomDto.lastMessage= redisChatRoom.getLastMessage();
        getRoomDto.isNew= redisChatRoom.isNew();
        getRoomDto.nickName = redisChatRoom.getSeller().equals(memberId)? redisChatRoom.getBuyer(): redisChatRoom.getSeller();
        return getRoomDto;
    }
}
