package com.pickpack.memberservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
public class ItemController {

    @GetMapping("/health2")
    public String healthCheck(){
        return "this is itemController";
    }

}
