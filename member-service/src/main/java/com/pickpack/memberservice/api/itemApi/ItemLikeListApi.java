package com.pickpack.memberservice.api.itemApi;

import com.pickpack.memberservice.dto.item.ItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ItemLikeListApi {

    private List<ItemDto> buyWishList;
    private List<ItemDto> borrowWishList;

}
