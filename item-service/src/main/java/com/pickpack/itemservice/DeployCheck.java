package com.pickpack.itemservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/item")
public class DeployCheck {

    @GetMapping("/check")
    public String welcomeCheck(){
        return "Welcome to the pick&pack 🥨 item-service";
    }

}

