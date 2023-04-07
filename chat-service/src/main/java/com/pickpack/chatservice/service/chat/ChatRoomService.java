package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.CreateRoomReqDto;
import com.pickpack.chatservice.dto.GetRoomDto;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;

import java.util.List;

public interface ChatRoomService{
    void saveRedisChatRoom(RedisChatRoom redisChatRoom, String nickname);
    RedisChatRoom createChatRoom(CreateRoomReqDto createRoomReqDto);
    void updateRoomStatus(RedisChatRoom redisChatRoom);
    List<GetRoomDto> findRoomById(String nickname);
    void redisChatRoomWarming();
    void sendRoomToDB();
}
