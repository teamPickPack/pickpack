package com.pickpack.chatservice.controller;

import com.pickpack.chatservice.dto.ChatPagingReqDto;
import com.pickpack.chatservice.dto.ChatPagingResDto;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import com.pickpack.chatservice.service.chat.ChatMessageService;
import com.pickpack.chatservice.service.chat.pubsub.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @MessageMapping("/message")
    //chat/pub/message
    public void message(RedisChatMessage message) {
        log.info("메시지 성공, 메시지 보낸 사람:{}",message.getSender());;
        redisPublisher.publishMessage(message);
    }

    @GetMapping("/api/chat/message")
    public ResponseEntity<ChatPagingResDto> getMessages(@RequestParam String roomId, String date) {
//        log.info("roomId:{}, page(date):{}",chatPagingReqDTO.getRoomId(),chatPagingReqDTO.getDate());
        return new ResponseEntity<>(chatMessageService.getMessages(roomId,date), HttpStatus.OK);
    }
    //TODO 페이징처리!!!!!!!!!!!!!!!

    @GetMapping("/chat/check")
    public String check(){
        return("check 성공이어유");
    }
}
