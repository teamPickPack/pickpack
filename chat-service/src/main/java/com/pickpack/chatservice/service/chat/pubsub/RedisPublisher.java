package com.pickpack.chatservice.service.chat.pubsub;


import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.service.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class RedisPublisher {
    private final ChannelTopic channelTopic;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatMessageService chatMessageService;

    public void publishMessage(RedisChatMessage message) {
        if (RedisChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        message.setTime(LocalDateTime.now());
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        chatMessageService.createMessage(message);
        System.out.println("???????????????????????????????????????????????");

        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
}
