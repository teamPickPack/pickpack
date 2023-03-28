package com.pickpack.itemservice.dto.item;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ItemCreateDto {
    private Long memberId;
    private String category;
    private String itemName;
    private  Integer price;
    private String title;
    private String content;
    private Long cityId;
}
