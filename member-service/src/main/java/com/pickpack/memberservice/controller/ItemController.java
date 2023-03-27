package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.api.itemApi.BorrowRentItemListApi;
import com.pickpack.memberservice.api.itemApi.BuySellItemListApi;
import com.pickpack.memberservice.api.itemApi.ItemLikeListApi;
import com.pickpack.memberservice.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Path;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/health2")
    public String healthCheck(){
        return "this is itemController";
    }


    @GetMapping("/{memberId}/deal")
    public ResponseEntity<?> buySellList(@PathVariable Long memberId){
        BuySellItemListApi buySellItems = itemService.findBuySellItems(memberId);
        return new ResponseEntity<>(buySellItems, HttpStatus.OK);
    }

    @GetMapping("/{memberId}/rent")
    public ResponseEntity<?> borrowRentList(@PathVariable Long memberId){
        BorrowRentItemListApi borrowRentItems = itemService.findBorrowRentItems(memberId);
        return new ResponseEntity<>(borrowRentItems, HttpStatus.OK);
    }

    @GetMapping("/{memberId}/item")
    public ResponseEntity<?> itemLikeList(@PathVariable Long memberId){
        ItemLikeListApi likedItems = itemService.findLikedItems(memberId);
        return new ResponseEntity<>(likedItems, HttpStatus.OK);
    }


}
