package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;

import java.util.List;

public interface ChatMessageService {
    void createMessage(RedisChatMessage message);

    void redisChatMessageWarming();

    void sendMessageToDB();
    List<RedisChatMessage> getMessages(String roomId);
}
