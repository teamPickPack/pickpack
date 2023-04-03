package com.pickpack.chatservice.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ChatPagingReqDto {
    private String roomId;
//    @JsonDeserialize(using = LocalDateDeserializer.class)
//    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate date;

}
