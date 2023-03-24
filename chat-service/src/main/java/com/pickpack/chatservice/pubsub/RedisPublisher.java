package com.pickpack.chatservice.pubsub;

import com.pickpack.chatservice.dto.FileDto;
import com.pickpack.chatservice.entity.redis.ChatMessage;
import com.pickpack.chatservice.service.fileupload.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;

@RequiredArgsConstructor
@Service
public class RedisPublisher {
    private final ChannelTopic channelTopic;
    private final RedisTemplate<String, Object> redisTemplate;
    private final FileUploadService fileUploadService;

    public void publishMessage(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            //TODO Setter를 써도 되는지에 대한 토의
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        message.setTime(LocalDateTime.now());
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
    public void publishImg(FileDto fileDto) {
        String imgUrl = fileUploadService.fileUpLoad(fileDto);
        ChatMessage message = ChatMessage.convertFileToMessage(fileDto,imgUrl);
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
}
