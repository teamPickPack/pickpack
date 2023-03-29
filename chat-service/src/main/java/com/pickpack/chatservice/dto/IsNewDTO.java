package com.pickpack.chatservice.dto;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class IsNewDTO {
    private String lastMessage;
    private int size;

    public static IsNewDTO create(List<RedisChatMessage> list){
        IsNewDTO isNewDto = new IsNewDTO();
        isNewDto.lastMessage =list.isEmpty()? null:list.get(list.size()-1).getMessage();
        isNewDto.size=list.size();
        return isNewDto;
    }
}
