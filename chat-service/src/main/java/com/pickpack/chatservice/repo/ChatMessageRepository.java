package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.dto.IsNewDto;
import com.pickpack.chatservice.entity.redis.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ChatMessageRepository {
    private static final String CHAT_MESSAGES = "CHAT_MESSAGES";
    private final RedisTemplate<String, Object> redisTemplate;

    private HashOperations<String, String, List<ChatMessage>> opsHashChatMessage;

    @PostConstruct
    private void init() {
        opsHashChatMessage = redisTemplate.opsForHash();
    }
    /**
     * message를 redis에 저장하는 메소드
     * .haskey를 이용해 NullPointerException 회피
     *
     * @param message
     */
    public void createMessage(ChatMessage message) {
        List<ChatMessage> list;
        if (!opsHashChatMessage.hasKey(CHAT_MESSAGES, message.getRoomId())) {
            list = new ArrayList<>();
        } else {
            list = opsHashChatMessage.get(CHAT_MESSAGES, message.getRoomId());
        }
        list.add(message);
        opsHashChatMessage.put(CHAT_MESSAGES, message.getRoomId(), list);
    }

    /**
     *
     * 채팅룸 id를 통해 메시지 리스트들 가져오기
     * @param roomId
     * @return List<ChatMessage>
     */
    public List<ChatMessage> findMessage(String roomId) {
        return opsHashChatMessage.get(CHAT_MESSAGES, roomId);
    }

    //마지막 메시지 주기
    public IsNewDto findSizeAndLastMessage(String roomId){
        if(opsHashChatMessage.hasKey(CHAT_MESSAGES,roomId)){
            return IsNewDto.create(opsHashChatMessage.get(CHAT_MESSAGES,roomId));
        }else{
            return null;
        }
    }
}
