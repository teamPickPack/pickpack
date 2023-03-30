package com.pickpack.itemservice.service.itemLike;

import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.entity.ItemLike;
import com.pickpack.itemservice.entity.Member;
import com.pickpack.itemservice.exception.AlreadyLikeException;
import com.pickpack.itemservice.exception.IsNullException;
import com.pickpack.itemservice.exception.NotLikeException;
import com.pickpack.itemservice.repository.item.ItemRepository;
import com.pickpack.itemservice.repository.itemLike.ItemLikeRepository;
import com.pickpack.itemservice.repository.member.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemLikeService {

    private final ItemLikeRepository itemLikeRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

    public Long likeItem(Long itemId, Long memberId){
        ItemLike itemLike = null;
        List<ItemLike> itemLikeList = itemLikeRepository.findByItemIdAndMemberId(itemId, memberId);
        if(!itemLikeList.isEmpty()){
            itemLike = itemLikeList.get(0);
            if(!itemLike.isDelete()){
                throw new AlreadyLikeException(itemId + " 물품 게시글은 이미 찜한 게시글 입니다.");
            }else{
                itemLike.setDelete(false);
                itemLikeRepository.save(itemLike);
            }
        }else {
            Item item = itemRepository.findById(itemId).orElseThrow(() -> new IsNullException(itemId + "에 해당하는 물품 게시글이 없습니다."));
            Member member = memberRepository.findById(memberId).orElseThrow(() -> new IsNullException(memberId + "에 해당하는 회원이 없습니다."));

            itemLike = ItemLike.createItemLike(item, member);

            itemLikeRepository.save(itemLike);
        }
        return itemLike.getId();
    }

    public void unlikeItem(Long itemId, Long memberId){
        List<ItemLike> itemLikeList = itemLikeRepository.findByItemIdAndMemberId(itemId, memberId);
        if(itemLikeList.isEmpty()){
            throw new NotLikeException(itemId + " 물품 게시글을 찜 하지 않았습니다.");
        }
        ItemLike itemLike = itemLikeList.get(0);
        itemLike.unlike();
        itemLike.setDelete(true);
        itemLikeRepository.save(itemLike);
    }

}
