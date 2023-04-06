package com.pickpack.itemservice.controller.item;

import com.pickpack.itemservice.api.request.ItemCompleteReq;
import com.pickpack.itemservice.api.request.ItemMemberReq;
import com.pickpack.itemservice.api.request.ItemSearchTitleReq;
import com.pickpack.itemservice.api.response.ListRes;
import com.pickpack.itemservice.dto.item.ItemCreateDto;
import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.dto.item.ItemModifyDto;
import com.pickpack.itemservice.service.item.ItemService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.LinkedList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/item")
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createItem(@RequestPart ItemCreateDto item, @RequestPart(value = "imgs", required = false) List<MultipartFile> imgs){
        log.info("----------------createItem-----------------");
        
        try {
            Long id = itemService.createItem(item.getMemberId(), item.getTitle(), item.getCategory(), item.getPrice(), item.getContent(), item.getItemName(), item.getCityId(), imgs);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    @PutMapping(value = "/{itemId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> modifyItem(@PathVariable("itemId") Long itemId, @RequestPart ItemModifyDto item, @RequestPart(value = "imgs", required = false) List<MultipartFile> imgs){
        try{
            Long id = itemService.modifyItem(itemId, item.getMemberId(), item.getTitle(), item.getCategory(), item.getPrice(), item.getContent(), item.getItemName(), item.getCityId(), item.getImgUrl(),  imgs);
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

    @PostMapping("/{category}/title/{page}")
    public ResponseEntity<?> getItemsSearchOnTitle(@PathVariable("category") String category, @PathVariable("page") Integer page, @RequestBody ItemSearchTitleReq itemSearchTitleReq){
        try{
            log.info("아이템 검색어 = {}",itemSearchTitleReq.getSearch());
            return new ResponseEntity<>(itemService.getItemsSearchOnTitle(category, itemSearchTitleReq.getSearch(), page), HttpStatus.OK);
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

    @PostMapping("/complete")
    public ResponseEntity<?> completeItem(@RequestBody ItemCompleteReq itemCompleteReq){
        try {
            return new ResponseEntity<>(itemService.completeItem(itemCompleteReq.getItemId(), itemCompleteReq.getNickname()), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
