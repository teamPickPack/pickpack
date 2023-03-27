package com.pickpack.chatservice.dto;

import lombok.Getter;

@Getter
public class CreateRoomDto {
    private Long itemId;
    private String itemName;
    private String seller;
    private String buyer;
}
