package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.item.ItemDto;

import java.util.List;

public interface ItemRepositoryCustom {

    List<ItemDto> findItemList(Long memberId, String cat);

    List<ItemDto> findLikeItemList(Long memberId, String cat);

}
