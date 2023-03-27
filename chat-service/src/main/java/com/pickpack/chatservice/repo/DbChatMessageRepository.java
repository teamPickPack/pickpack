package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.ChatMessage;
import com.pickpack.chatservice.entity.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface DbChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findChatMessagesByTimeAfterAndChatRoomOrderByTimeDesc(Timestamp time, ChatRoom chatRoom);

}
