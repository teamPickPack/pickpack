package com.pickpack.itemservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/item")
@Slf4j
public class DeployCheck {

    @GetMapping("/check")
    public String welcomeCheck(){
        log.info("deploy check!!");
        return "Welcome to the pick&pack 🥨 item-service";
    }

}

