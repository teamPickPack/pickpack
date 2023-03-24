package com.pickpack.chatservice.dto;

import lombok.Getter;

@Getter
public class CreateRoomDto {
    private String itemId;
    private String itemName;
    private String seller;
    private String buyer;
}
