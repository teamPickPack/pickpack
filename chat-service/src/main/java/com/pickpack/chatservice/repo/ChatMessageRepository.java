package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.ChatMessage;
import com.pickpack.chatservice.entity.ChatRoom;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    Optional<List<ChatMessage>> findChatMessagesByTimeBetweenAndChatRoomOrderByTime(Timestamp start, Timestamp end, ChatRoom chatRoom);
    List<ChatMessage> findChatMessagesByTimeAfterAndChatRoomOrderByTime(Timestamp time, ChatRoom chatRoom);
    List<ChatMessage> findAllById(String roomId);
    ChatMessage findTop1ById(String roomId);
}
