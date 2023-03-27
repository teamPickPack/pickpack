package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class IsNewDto {
    private String lastMessage;
    private Long size;

    public static IsNewDto create(List<RedisChatMessage> list){
        IsNewDto isNewDto = new IsNewDto();
        isNewDto.lastMessage=list.get(list.size()-1).getMessage();
        isNewDto.size=(long)list.size();
        return isNewDto;
    }
}
