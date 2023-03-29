package com.pickpack.itemservice.controller.itemLike;

import com.pickpack.itemservice.api.request.ItemLikeReq;
import com.pickpack.itemservice.service.itemLike.ItemLikeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/item")
public class ItemLikeController {
    private final ItemLikeService itemLikeService;

    @PostMapping("/like")
    public ResponseEntity<?> likeItem(@RequestBody ItemLikeReq itemLikeReq){
        try{
            return new ResponseEntity<>(itemLikeService.likeItem(itemLikeReq.getItemId(),  itemLikeReq.getMemberId()), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
