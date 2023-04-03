package com.pickpack.itemservice.controller.item;

import com.pickpack.itemservice.api.request.ItemMemberReq;
import com.pickpack.itemservice.api.response.ListRes;
import com.pickpack.itemservice.dto.item.ItemCreateDto;
import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.service.item.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedList;

@RestController
@AllArgsConstructor
@RequestMapping("api/item")
public class ItemController {

    private final ItemService itemService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createItem(@RequestPart ItemCreateDto item, @RequestPart MultipartFile img){
        try {
            Long id = itemService.createItem(item.getMemberId(), item.getTitle(), item.getCategory(), item.getPrice(), item.getContent(), item.getItemName(), item.getCityId(), img);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }

    }

    @GetMapping("/{category}/{page}")
    public ResponseEntity<?> getItemsWithCategory(@PathVariable("category") String category, @PathVariable("page") Integer page){
        try{
            return new ResponseEntity<>(itemService.getItemsWithCategory(category, page), HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    @GetMapping("/{category}/title/{search}/{page}")
    public ResponseEntity<?> getItemsSearchOnTitle(@PathVariable("category") String category, @PathVariable("search") String search, @PathVariable("page") Integer page){
        try{
            return new ResponseEntity<>(itemService.getItemsSearchOnTitle(category, search, page), HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }
    @GetMapping("/{category}/city/{cityId}/{page}")
    public ResponseEntity<?> getItemsSearchOnCity(@PathVariable("category") String category, @PathVariable("cityId") Long cityId, @PathVariable("page") Integer page){
        try{
            return new ResponseEntity<>(itemService.getItemsSearchOnCity(category, cityId, page), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    @PostMapping("/detail")
    public ResponseEntity<?> getItemById(@RequestBody ItemMemberReq itemMemberReq){
        try{
            return new ResponseEntity<>(itemService.getItemById(itemMemberReq.getItemId(), itemMemberReq.getMemberId()), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    @PutMapping("/complete")
    public ResponseEntity<?> completeItem(@RequestBody Long itemId){
        try {
            return new ResponseEntity<>(itemService.completeItem(itemId), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
