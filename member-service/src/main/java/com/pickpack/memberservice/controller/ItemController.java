package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.service.ItemService;
import lombok.RequiredArgsConstructor;
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
    public void buySellList(@PathVariable Long memberId){

    }


}