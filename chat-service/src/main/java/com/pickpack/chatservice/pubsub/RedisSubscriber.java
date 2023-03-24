package com.pickpack.chatservice.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickpack.chatservice.entity.redis.ChatMessage;
import com.pickpack.chatservice.repo.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber{

    private final ObjectMapper objectMapper;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessageSendingOperations messagingTemplate;
    public void sendMessage(String publishMessage) {
        try {
            ChatMessage roomMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
            chatMessageRepository.createMessage(roomMessage);

            // Websocket 구독자에게 채팅 메시지 Send
            messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
