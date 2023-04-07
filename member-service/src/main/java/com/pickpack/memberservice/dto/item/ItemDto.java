package com.pickpack.memberservice.dto.item;

import com.pickpack.memberservice.entity.Category;
import lombok.*;

@Data
@ToString
@NoArgsConstructor
public class ItemDto {

    private Long itemId;
    private Long memberId;
    private String title;
    private Category category;
    private Integer price;
    private String content;
    private String imgUrl;
    private String registDate;
    private Long buyer;
    private boolean isComplete;
    private Long cityId;
    private String cityName;

}
