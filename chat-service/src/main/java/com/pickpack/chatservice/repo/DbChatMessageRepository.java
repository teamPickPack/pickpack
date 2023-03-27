package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DbChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
