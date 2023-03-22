package com.pickpack.memberservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member/")
public class DeployCheck {

    @GetMapping("/check")
    public String welcomeCheck(){
        return "welcome to the 🎄 member-service";
    }

}
