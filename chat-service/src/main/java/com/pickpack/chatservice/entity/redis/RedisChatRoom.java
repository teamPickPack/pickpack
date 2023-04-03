package com.pickpack.chatservice.entity.redis;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.pickpack.chatservice.dto.IsNewDto;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

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

    //새로운거 봐주려고..
    private int messageSize;
    private String lastMessage;
    private boolean isNew;
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime lastMessageTime;

    public void change(IsNewDto isNewDto) {
        this.isNew= (!Objects.equals(this.messageSize, isNewDto.getSize()));
        this.lastMessage= isNewDto.getLastMessage();
        this.messageSize= isNewDto.getSize();
    }
    public void updateTime(LocalDateTime time){
        this.lastMessageTime=time;
    }
}
