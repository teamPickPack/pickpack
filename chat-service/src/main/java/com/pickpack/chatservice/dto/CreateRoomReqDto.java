package com.pickpack.chatservice.dto;

import lombok.Getter;

@Getter
public class CreateRoomReqDto {
    private Long itemId;
    private String seller;
    private String buyer;
}
