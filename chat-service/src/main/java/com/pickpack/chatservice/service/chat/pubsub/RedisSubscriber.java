package com.pickpack.chatservice.service.chat.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.service.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber{

    private final ObjectMapper objectMapper;
    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations messagingTemplate;
    public void sendMessage(String publishMessage) {
        try {
            RedisChatMessage roomMessage = objectMapper.readValue(publishMessage, RedisChatMessage.class);

            messagingTemplate.convertAndSend("/chat/sub/room/" + URLDecoder.decode(roomMessage.getRoomId(), StandardCharsets.UTF_8), roomMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
