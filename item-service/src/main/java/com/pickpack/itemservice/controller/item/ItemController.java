package com.pickpack.itemservice.controller.item;

import com.pickpack.itemservice.api.request.ListRes;
import com.pickpack.itemservice.dto.item.ItemCreateDto;
import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.service.item.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.Path;

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

    @GetMapping("/{category}")
    public ResponseEntity<?> getItemsWithCategory(@PathVariable("category") String category){
        try{
            return new ResponseEntity<>(new ListRes(itemService.getItemsWithCategory(category)), HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    @GetMapping("/{category}/title/{search}")
    public ResponseEntity<?> getItemsSearchOnTitle(@PathVariable("category") String category, @PathVariable("search") String search){
        try{
            return new ResponseEntity<>(new ListRes(itemService.getItemsSearchOnTitle(category, search)), HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }
    @GetMapping("/{category}/city/{cityId}")
    public ResponseEntity<?> getItemsSearchOnCity(@PathVariable("category") String category, @PathVariable("cityId") Long cityId){
        try{
            return new ResponseEntity<>(new ListRes(itemService.getItemsSearchOnCity(category, cityId)), HttpStatus.OK);
        }catch (Exception e){
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
