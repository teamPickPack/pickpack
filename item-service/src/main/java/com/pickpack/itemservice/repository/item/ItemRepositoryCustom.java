package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.Category;
import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.entity.Member;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ItemRepositoryCustom {
    List<ItemListDto> getItemsWithCategory(Pageable pageable, String categoryStr);
    List<ItemListDto> getItemsSearchOnTitle(Pageable pageable, String categoryStr, String search);
    List<ItemListDto> getItemsSearchOnCity(Pageable pageable, String categoryStr, Long cityId);
    List<ItemListDto> getItemsByMember(Long itemId, Long memberId, Category category);
    ItemDetailDto getItemById(Long itemId);
}
