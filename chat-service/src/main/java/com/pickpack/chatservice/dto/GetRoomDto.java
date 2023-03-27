package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GetRoomDto {
    private String chatRoomId;
    private Long itemId;
    private String imgUrl;
    private String lastMessage;
    private String nickName;
    private boolean isNew;

    public GetRoomDto chatRoomToGetRoomDto(RedisChatRoom redisChatRoom, String memberId){
        GetRoomDto getRoomDto = new GetRoomDto();
        getRoomDto.chatRoomId= redisChatRoom.getRoomId();
        getRoomDto.itemId= redisChatRoom.getItemId();
        getRoomDto.imgUrl= redisChatRoom.getImgUrl();
        getRoomDto.lastMessage= redisChatRoom.getLastMessage();
        getRoomDto.isNew= redisChatRoom.isNew();
        getRoomDto.nickName = redisChatRoom.getSeller().equals(memberId)? redisChatRoom.getBuyer(): redisChatRoom.getSeller();
        return getRoomDto;
    }
}
