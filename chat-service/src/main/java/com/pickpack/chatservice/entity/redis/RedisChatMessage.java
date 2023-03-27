package com.pickpack.chatservice.entity.redis;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.pickpack.chatservice.dto.FileDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class RedisChatMessage implements Serializable {

//    private static final long serialVersionUID = -3377559815188666211L;



    public enum MessageType {
        ENTER, TALK, IMAGE
    }

    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime time;

    public static RedisChatMessage convertFileToMessage(FileDto fileDto, String imgUrl){
        RedisChatMessage chatMessage = new RedisChatMessage();
        chatMessage.type=MessageType.IMAGE;
        chatMessage.roomId= fileDto.getRoomId();
        chatMessage.sender=fileDto.getSender();
        chatMessage.message=imgUrl;
        chatMessage.time=LocalDateTime.now();
        return chatMessage;
    }

}
