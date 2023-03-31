package com.pickpack.memberservice;

import com.pickpack.memberservice.firebase2.FirebaseCloudMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Date;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/member/")
@Slf4j

public class DeployCheck {


//    @Value("${my.name}")
//    private String name;


    @GetMapping("/check")
    public String welcomeCheck(){
        Date today = new Date();

        System.out.println();

//        System.out.println(name);
        System.out.println(today);
        System.out.println(LocalDateTime.now());
        return "Welcome to the 🎄 member-service!!!!!";
    }

}
