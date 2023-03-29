package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;

public interface ChatMessageService {
    void createMessage(RedisChatMessage message);

    void redisChatMessageWarming();

    void sendMessageToDB();
}
