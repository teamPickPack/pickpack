package com.pickpack.itemservice.api.request;

import com.pickpack.itemservice.dto.item.ItemCreateDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ItemCreateReq {
    private ItemCreateDto item;
}
