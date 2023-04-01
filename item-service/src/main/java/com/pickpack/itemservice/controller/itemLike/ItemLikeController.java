package com.pickpack.itemservice.controller.itemLike;

import com.pickpack.itemservice.api.request.ItemMemberReq;
import com.pickpack.itemservice.service.itemLike.ItemLikeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/item")
public class ItemLikeController {
    private final ItemLikeService itemLikeService;

    @PostMapping("/like")
    public ResponseEntity<?> likeItem(@RequestBody ItemMemberReq itemLikeReq){
        try{
            return new ResponseEntity<>(itemLikeService.likeItem(itemLikeReq.getItemId(),  itemLikeReq.getMemberId()), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    @PutMapping("/like")
    public ResponseEntity<?> unlikeItem(@RequestBody ItemMemberReq itemLikeReq){
        try{
            itemLikeService.unlikeItem(itemLikeReq.getItemId(), itemLikeReq.getMemberId());
            return new ResponseEntity<>(itemLikeReq.getItemId() + " 물품 게시글 찜 취소", HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
