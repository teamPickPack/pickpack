package com.pickpack.chatservice.entity.redis;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.pickpack.chatservice.dto.FileDto;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import reactor.util.annotation.Nullable;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class ChatMessage implements Serializable {

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

    public static ChatMessage convertFileToMessage(FileDto fileDto, String imgUrl){
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.type=MessageType.IMAGE;
        chatMessage.roomId= fileDto.getRoomId();
        chatMessage.sender=fileDto.getSender();
        chatMessage.message=imgUrl;
        chatMessage.time=LocalDateTime.now();
        return chatMessage;
    }

}
