package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.ChatPagingResDto;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;

import java.time.LocalDate;

public interface ChatMessageService {
    void createMessage(RedisChatMessage message);

    void redisChatMessageWarming();

    void sendMessageToDB();
    ChatPagingResDto getMessages(String roomId, String page);
}
