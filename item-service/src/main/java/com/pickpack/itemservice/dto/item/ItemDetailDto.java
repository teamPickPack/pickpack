package com.pickpack.itemservice.dto.item;

import com.pickpack.itemservice.entity.Category;
import com.pickpack.itemservice.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDetailDto {
    private Long itemId;
    private Long memberId;
    private String nickname;
    private String title;
    private String content;
    private Category category;
    private Integer price;
    private String itemName;
    private String imgUrl;
    private String registDate;
    private Boolean isComplete;
    private Long cityId;
    private String cityName;

}
