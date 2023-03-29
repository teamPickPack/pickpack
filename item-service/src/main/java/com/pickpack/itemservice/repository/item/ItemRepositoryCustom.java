package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.Category;
import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.entity.Member;

import java.util.List;
import java.util.Optional;

public interface ItemRepositoryCustom {
    List<ItemListDto> getItemsWithCategory(String categoryStr);
    List<ItemListDto> getItemsSearchOnTitle(String categoryStr, String search);
    List<ItemListDto> getItemsSearchOnCity(String categoryStr, Long cityId);
    List<ItemListDto> getItemsByMember(Long itemId, Long memberId);
    ItemDetailDto getItemById(Long itemId);
}
