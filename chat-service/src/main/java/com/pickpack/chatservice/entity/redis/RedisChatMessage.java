package com.pickpack.chatservice.entity.redis;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.pickpack.chatservice.entity.ChatMessage;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class RedisChatMessage implements Serializable {

    private static final long serialVersionUID = -3377559815188666211L;



    public enum MessageType {
        ENTER, TALK, IMAGE
    }

    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지


    //TODO 줄때 포맷팅
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime time;

    public static RedisChatMessage convertToRedisChatMessage(ChatMessage chatMessage){
        RedisChatMessage redisChatMessage = new RedisChatMessage();
        redisChatMessage.type=chatMessage.getType();
        redisChatMessage.roomId= chatMessage.getChatRoom().getRoomId();
        redisChatMessage.sender=chatMessage.getSender();
        redisChatMessage.message=chatMessage.getMessage();
        redisChatMessage.time=chatMessage.getTime().toLocalDateTime();
        return redisChatMessage;
    }

}
