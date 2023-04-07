package com.pickpack.itemservice.repository.itemLike;

import com.pickpack.itemservice.entity.ItemLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemLikeRepository extends JpaRepository<ItemLike, Long> {
    List<ItemLike> findByItemIdAndMemberIdAndIsDelete(Long itemId, Long memberId, Boolean delete);
    List<ItemLike> findByItemIdAndMemberId(Long itemId, Long memberId);

}
