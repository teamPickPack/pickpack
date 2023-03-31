package com.pickpack.chatservice.service.chat;

import com.pickpack.chatservice.dto.ChatPagingResDTO;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

import java.time.LocalDate;
import java.util.List;

public interface ChatMessageService {
    void createMessage(RedisChatMessage message);

    void redisChatMessageWarming();

    void sendMessageToDB();
    ChatPagingResDTO getMessages(String roomId, LocalDate page);
}
