package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.ChatMessage;
import com.pickpack.chatservice.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findChatMessagesByTimeAfterAndChatRoomOrderByTime(Timestamp time, ChatRoom chatRoom);

}
