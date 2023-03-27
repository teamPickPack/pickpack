package com.pickpack.chatservice.controller;

import com.pickpack.chatservice.dto.FileDto;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.pubsub.RedisPublisher;
import com.pickpack.chatservice.repo.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {
    private final RedisPublisher redisPublisher;
    private final ChatMessageRepository chatMessageRepository;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(RedisChatMessage message) {
        log.info("메시지 성공, 메시지 보낸 사람:{}",message.getSender());
        redisPublisher.publishMessage(message);
    }
    @MessageMapping("/chat/img")
    public void imgUpload(FileDto fileDto) {
        log.info("이미지 성공, 이미지 보낸 사람:{}",fileDto.getSender());

        //TODO exception처리
        if(fileDto.getData().isEmpty()) throw new RuntimeException("파일이 비었음");
        redisPublisher.publishImg(fileDto);
    }
    @GetMapping("/chat/message/{roomId}")
    public ResponseEntity<List<RedisChatMessage>> getMessages(@PathVariable String roomId) {
        return new ResponseEntity<>( chatMessageRepository.findMessage(roomId), HttpStatus.OK);
    }

}
