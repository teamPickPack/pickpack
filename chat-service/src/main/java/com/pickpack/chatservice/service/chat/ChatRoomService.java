package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.CreateRoomDTO;
import com.pickpack.chatservice.dto.GetRoomDTO;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;

import java.util.List;

public interface ChatRoomService{
    void saveRedisChatRoom(RedisChatRoom redisChatRoom, String nickname);
    RedisChatRoom createChatRoom(CreateRoomDTO createRoomDto);
    void updateRoomStatus(RedisChatRoom redisChatRoom);
    List<GetRoomDTO> findRoomById(String nickname);
    void redisChatRoomWarming();
    void sendRoomToDB();
}
