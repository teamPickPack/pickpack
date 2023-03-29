package com.pickpack.itemservice.api.request;

import lombok.Data;

@Data
public class ItemLikeReq {
    private Long itemId;
    private Long memberId;
}
