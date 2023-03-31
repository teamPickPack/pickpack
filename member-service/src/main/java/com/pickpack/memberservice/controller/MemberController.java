package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.dto.member.FindRespDto;
import com.pickpack.memberservice.dto.member.JoinReqDto;
import com.pickpack.memberservice.dto.member.JoinRespDto;
import com.pickpack.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/health1")
    public String healthCheck(){
        return "this is memberController";
    }

    /**
     * 회원가입
     */
    @CrossOrigin(origins = "*")

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinReqDto joinReqDto){
        JoinRespDto joinRespDto = memberService.join(joinReqDto);
        return new ResponseEntity<>(joinRespDto, HttpStatus.CREATED);
    }

    /**
     *  회원 정보 조회
     */
    @GetMapping("/{memberId}")
    public ResponseEntity<?> info(@PathVariable Long memberId){
        FindRespDto findRespDto = memberService.findMember(memberId);
        return new ResponseEntity<>(findRespDto, HttpStatus.OK);
    }


}
