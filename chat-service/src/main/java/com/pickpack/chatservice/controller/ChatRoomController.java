package com.pickpack.chatservice.controller;

import com.pickpack.chatservice.dto.CreateRoomDTO;
import com.pickpack.chatservice.dto.GetRoomDTO;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import com.pickpack.chatservice.service.chat.ChatMessageService;
import com.pickpack.chatservice.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final RedisTemplate<String, Object> redisTemplate;

    @PostMapping("/room")
    public ResponseEntity<RedisChatRoom> createRoom(@RequestBody CreateRoomDTO createRoomDto) {
        return new ResponseEntity<>(chatRoomService.createChatRoom(createRoomDto), HttpStatus.CREATED);
    }

    @GetMapping("/room/{nickname}")
    public ResponseEntity<List<GetRoomDTO>> getChatRoomInfo(@PathVariable String nickname) {

        return new ResponseEntity<>(chatRoomService.findRoomById(nickname),HttpStatus.OK);
    }
    @GetMapping("/apitest1")
    public void test() {
        log.info("room->db 시작");
        chatRoomService.sendRoomToDB();
        log.info("room->db 완료");
        log.info("message->db 시작");
        chatMessageService.sendMessageToDB();
        log.info("message->db 완료");
    }
    @GetMapping("/deleteroom")
    public void deleteroom() {
        log.info("deleteroom 시작");
        redisTemplate.delete("CHAT_ROOM");
        log.info("deleteroomb 완료");

    }
    @GetMapping("/deletemessage")
    public void deletemessage() {
        log.info("deletemessage 시작");
        redisTemplate.delete("CHAT_MESSAGES");
        log.info("deletemessage 완료");

    }
    @GetMapping("/apitest2")
    public void test2() {
        log.info("db->room 시작");
        chatRoomService.redisChatRoomWarming();
        log.info("db->room 완료");
        log.info("db->message 시작");
        chatMessageService.redisChatMessageWarming();
        log.info("db->message 완료");
    }

}
