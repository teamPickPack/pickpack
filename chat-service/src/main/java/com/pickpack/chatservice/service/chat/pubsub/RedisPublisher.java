package com.pickpack.chatservice.service.chat.pubsub;


import com.pickpack.chatservice.entity.redis.RedisChatMessage;
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

    public void publishMessage(RedisChatMessage message) {
        if (RedisChatMessage.MessageType.ENTER.equals(message.getType())) {
            //TODO Setter를 써도 되는지에 대한 토의
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        message.setTime(LocalDateTime.now());
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
//    public void publishImg(FileDto fileDto) {
//        String imgUrl = fileUploadService.fileUpLoad(fileDto);
//        RedisChatMessage message = RedisChatMessage.convertFileToMessage(fileDto,imgUrl);
//        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
//    }
}
