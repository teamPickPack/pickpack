package com.pickpack.memberservice.service;

import com.pickpack.memberservice.entity.Item;
import com.pickpack.memberservice.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    @Transactional(readOnly = true)
    public void findBuyItems(Long memberId){
//        List<Item> boughtList = itemRepository.findBoughtList("BUY", memberId);
    }

    @Transactional(readOnly = true)
    public void findSellItems(Long memberId){
//        List<Item> sellingList = itemRepository.findBoughtList("SELL", memberId);
    }


}
