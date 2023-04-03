package com.pickpack.chatservice.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class ChatPagingReqDTO {
    private String roomId;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate date;

}
