package com.pickpack.itemservice.api.request;

import lombok.Data;

@Data
public class ItemCompleteReq {
    private Long itemId;
    private String nickname;
}
