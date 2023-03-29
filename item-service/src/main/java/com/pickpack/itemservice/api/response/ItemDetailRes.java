package com.pickpack.itemservice.api.response;

import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.dto.item.ItemListDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ItemDetailRes {
    ItemDetailDto item;
    List<ItemListDto> otherItems;
}
