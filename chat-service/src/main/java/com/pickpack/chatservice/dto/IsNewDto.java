package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.ChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class IsNewDto {
    private String lastMessage;
    private int size;

    public static IsNewDto create(List<ChatMessage> list){
        IsNewDto isNewDto = new IsNewDto();
        isNewDto.lastMessage=list.get(list.size()-1).getMessage();
        isNewDto.size=list.size();
        return isNewDto;
    }
}
