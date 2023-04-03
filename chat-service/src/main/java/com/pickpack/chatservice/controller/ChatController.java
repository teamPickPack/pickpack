package com.pickpack.chatservice.controller;

import com.pickpack.chatservice.dto.ChatPagingReqDTO;
import com.pickpack.chatservice.dto.ChatPagingResDTO;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.service.chat.ChatMessageService;
import com.pickpack.chatservice.service.chat.pubsub.RedisPublisher;
import com.pickpack.chatservice.repo.redis.RedisChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
//@RequestMapping("/api/chat")
public class ChatController {
    private final RedisPublisher redisPublisher;
    private final ChatMessageService chatMessageService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @CrossOrigin("*")
    @MessageMapping("/chat/message")
    public void message(RedisChatMessage message) {
        log.info("메시지 성공, 메시지 보낸 사람:{}",message.getSender());;
        redisPublisher.publishMessage(message);
    }

    @GetMapping("/api/chat/message/{roomId}")
    public ResponseEntity<ChatPagingResDTO> getMessages(@PathVariable String roomId, @RequestBody ChatPagingReqDTO page) {
        log.info("roomId:{}, page(date):{}",roomId,page.getDate());
        return new ResponseEntity<>(chatMessageService.getMessages(roomId,page.getDate()), HttpStatus.OK);
    }
    @GetMapping("/chat/check")
    public String check(){
        return("check 성공이어유");
    }
    //TODO 페이징처리!!!!!!!!!!!!!!!
}
