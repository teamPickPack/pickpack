package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class ChatPagingResDTO {
    private int pageSize;
    private LocalDate date;

    private List<RedisChatMessage> chatMessages;

    public static ChatPagingResDTO messageListToDto(List<RedisChatMessage> redisChatMessageList){
        ChatPagingResDTO chatPagingResDTO = new ChatPagingResDTO();
        chatPagingResDTO.date = redisChatMessageList.get(0).getTime().toLocalDate();
        chatPagingResDTO.pageSize=redisChatMessageList.size();
        chatPagingResDTO.chatMessages=redisChatMessageList;
        return chatPagingResDTO;
    }
}
