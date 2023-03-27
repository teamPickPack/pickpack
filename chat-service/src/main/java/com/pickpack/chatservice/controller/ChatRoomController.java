package com.pickpack.chatservice.controller;

import com.pickpack.chatservice.dto.CreateRoomDto;
import com.pickpack.chatservice.dto.GetRoomDto;
import com.pickpack.chatservice.entity.redis.RedisChatRoom;
import com.pickpack.chatservice.repo.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    @PostMapping("/room")
    public ResponseEntity<RedisChatRoom> createRoom(@RequestBody CreateRoomDto createRoomDto) {
        return new ResponseEntity<>(chatRoomRepository.createChatRoom(createRoomDto), HttpStatus.CREATED);
    }

    @GetMapping("/room/{memberId}")
    public ResponseEntity<List<GetRoomDto>> getChatRoomInfo(@PathVariable String memberId) {
        return new ResponseEntity<>(chatRoomRepository.findRoomById(memberId),HttpStatus.OK);
    }

}
