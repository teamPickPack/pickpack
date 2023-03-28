package com.pickpack.itemservice.controller.item;

import com.pickpack.itemservice.dto.item.ItemCreateDto;
import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.service.item.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
