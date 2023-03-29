package com.pickpack.itemservice.service.itemLike;

import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.entity.ItemLike;
import com.pickpack.itemservice.entity.Member;
import com.pickpack.itemservice.exception.IsNullException;
import com.pickpack.itemservice.repository.item.ItemRepository;
import com.pickpack.itemservice.repository.itemLike.ItemLikeRepository;
import com.pickpack.itemservice.repository.member.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ItemLikeService {

    private final ItemLikeRepository itemLikeRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

    public Long likeItem(Long itemId, Long memberId){
        Item item = itemRepository.findById(itemId).orElseThrow(()->new IsNullException(itemId + "에 해당하는 물품 게시글이 없습니다."));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new IsNullException(memberId + "에 해당하는 회원이 없습니다."));
        ItemLike itemLike = ItemLike.createItemLike(item, member);
        // item과 member에 연관관계 추가
        itemLikeRepository.save(itemLike);
        return itemLike.getId();
    }

}
