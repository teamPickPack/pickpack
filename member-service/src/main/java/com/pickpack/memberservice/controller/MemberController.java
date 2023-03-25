package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.dto.JoinReqDto;
import com.pickpack.memberservice.dto.JoinRespDto;
import com.pickpack.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/health1")
    public String healthCheck(){
        return "this is memberController";
    }

    /**
     * 회원가입
     */
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinReqDto joinReqDto){
        JoinRespDto joinRespDto = memberService.join(joinReqDto);
        return new ResponseEntity<>(joinRespDto, HttpStatus.CREATED);
    }

}
