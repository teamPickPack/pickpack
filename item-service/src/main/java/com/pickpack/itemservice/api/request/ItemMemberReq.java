package com.pickpack.itemservice.api.request;

import lombok.Data;

@Data
public class ItemMemberReq {
    private Long itemId;
    private Long memberId;
}
