package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.ChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class GetRoomDto {
    private String chatRoomId;
    private String itemId;
    private String imgUrl;
    private String lastMessage;
    private String nickName;
    private boolean isNew;

    public GetRoomDto chatRoomToGetRoomDto(ChatRoom chatRoom,String memberId){
        GetRoomDto getRoomDto = new GetRoomDto();
        getRoomDto.chatRoomId=chatRoom.getRoomId();
        getRoomDto.itemId=chatRoom.getItemId();
        getRoomDto.imgUrl= chatRoom.getImgUrl();
        getRoomDto.lastMessage=chatRoom.getLastMessage();
        getRoomDto.isNew=chatRoom.isNew();
        getRoomDto.nickName = chatRoom.getSeller().equals(memberId)?chatRoom.getBuyer():chatRoom.getSeller();
        return getRoomDto;
    }
}
