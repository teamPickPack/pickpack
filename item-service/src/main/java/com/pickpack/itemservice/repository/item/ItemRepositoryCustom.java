package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.Category;

import java.util.List;

public interface ItemRepositoryCustom {
    List<ItemListDto> getItemsWithCategory(String categoryStr);
}
