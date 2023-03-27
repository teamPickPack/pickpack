package com.pickpack.memberservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@RestController
@RequestMapping("/api/member/")
@Slf4j
public class DeployCheck {

    @GetMapping("/check")
    public String welcomeCheck(){
        Date today = new Date();
        System.out.println(today);
        System.out.println(LocalDateTime.now());
        return "Welcome to the 🎄 member-service!!";
    }

}
