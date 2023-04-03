package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class ChatPagingResDto {
    private int pageSize;
    private LocalDate date;

    private List<RedisChatMessage> chatMessages;

    public static ChatPagingResDto messageListToDto(List<RedisChatMessage> redisChatMessageList){
        ChatPagingResDto chatPagingResDTO = new ChatPagingResDto();
        chatPagingResDTO.date = redisChatMessageList.get(0).getTime().toLocalDate();
        chatPagingResDTO.pageSize=redisChatMessageList.size();
        chatPagingResDTO.chatMessages=redisChatMessageList;
        return chatPagingResDTO;
    }
}
