package com.pickpack.memberservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @GetMapping("/health1")
    public String healthCheck(){
        return "this is memberController";
    }

    /**
     * 회원가입
     */
//    @PostMapping("/join")
//    public ResponseEntity<?> join(){
//
//    }

}
