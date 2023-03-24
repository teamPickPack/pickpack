package com.pickpack.chatservice.entity.redis;

import com.pickpack.chatservice.dto.CreateRoomDto;
import com.pickpack.chatservice.dto.IsNewDto;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Builder
public class ChatRoom implements Serializable {

//    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;
    private String itemId;
    private String itemName;
    private String imgUrl;
    private String seller;
    private String buyer;
    private int messageSize;
    private String lastMessage;
    private boolean isNew;

    public void change(IsNewDto isNewDto) {
        this.isNew=this.messageSize!= isNewDto.getSize();
        this.lastMessage= isNewDto.getLastMessage();
        this.messageSize= isNewDto.getSize();
    }
}
