package com.pickpack.memberservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Path;

@RestController
@RequestMapping("/api/member")
public class ItemController {

    @GetMapping("/health2")
    public String healthCheck(){
        return "this is itemController";
    }


    @GetMapping("/{memberId}/deal")
    public void buySellList(@PathVariable Long memberId){

    }


}
