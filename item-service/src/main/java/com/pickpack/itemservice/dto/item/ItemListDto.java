package com.pickpack.itemservice.dto.item;

import com.pickpack.itemservice.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemListDto {
    private Long itemId;
    private Long memberId;
    private String title;
    private Category category;
    private Integer price;
    private String itemName;
    private String imgUrl;
    private String registDate;
    private Long cityId;
    private String cityName;
}
