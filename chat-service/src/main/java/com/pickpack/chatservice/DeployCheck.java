package com.pickpack.chatservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class DeployCheck {

    @GetMapping("/check")
    public String welcomeCheck(){
        return "welcome to the 🎁 chat-service";
    }

}
