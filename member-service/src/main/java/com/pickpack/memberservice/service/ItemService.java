package com.pickpack.memberservice.service;

import com.pickpack.memberservice.api.itemApi.BorrowRentItemListApi;
import com.pickpack.memberservice.api.itemApi.BuySellItemListApi;
import com.pickpack.memberservice.api.itemApi.ItemLikeListApi;
import com.pickpack.memberservice.dto.item.ItemDto;
import com.pickpack.memberservice.repository.CityRepository;
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
    public BuySellItemListApi findBuySellItems(Long memberId) {
        List<ItemDto> buyItemList = itemRepository.findItemList(memberId, "BUY");
        List<ItemDto> sellItemList = itemRepository.findItemList(memberId, "SELL");

        BuySellItemListApi buySellItemListApi = BuySellItemListApi.builder()
                                                    .buyItemList(buyItemList)
                                                    .sellItemList(sellItemList)
                                                    .build();
        return buySellItemListApi;
    }

    @Transactional(readOnly = true)
    public BorrowRentItemListApi findBorrowRentItems(Long memberId) {
        List<ItemDto> borrowItemList = itemRepository.findItemList(memberId, "BORROW");
        List<ItemDto> rentItemList = itemRepository.findItemList(memberId, "RENT");

        BorrowRentItemListApi borrowRentItemListApi = BorrowRentItemListApi.builder()
                                                            .borrowItemList(borrowItemList)
                                                            .rentItemList(rentItemList)
                                                            .build();
        return borrowRentItemListApi;
    }

    @Transactional(readOnly = true)
    public ItemLikeListApi findLikedItems(Long memberId){
        List<ItemDto> borrowItemList = itemRepository.findItemList(memberId, "BORROW");
        List<ItemDto> buyItemList = itemRepository.findItemList(memberId, "BUY");

        ItemLikeListApi likeListApi = ItemLikeListApi.builder()
                                            .borrowWishList(borrowItemList)
                                            .buyWishList(buyItemList)
                                            .build();
        return likeListApi;
    }


}
