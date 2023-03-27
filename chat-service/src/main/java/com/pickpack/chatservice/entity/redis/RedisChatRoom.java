package com.pickpack.chatservice.entity.redis;

import com.pickpack.chatservice.dto.IsNewDto;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Builder
public class RedisChatRoom implements Serializable {

    private static final long serialVersionUID = -3377559815188666211L;

    private String roomId;
    private Long itemId;
    private String itemName;
    private String imgUrl;
    private String seller;
    private String buyer;
    private Long messageSize;
    private String lastMessage;
    private boolean isNew;

    public void change(IsNewDto isNewDto) {
        this.isNew=this.messageSize!= isNewDto.getSize();
        this.lastMessage= isNewDto.getLastMessage();
        this.messageSize= isNewDto.getSize();
    }
}
