package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.dto.member.FindRespDto;
import com.pickpack.memberservice.dto.member.JoinReqDto;
import com.pickpack.memberservice.dto.member.JoinRespDto;
import com.pickpack.memberservice.exception.custom.NotExistMIdException;
import com.pickpack.memberservice.exception.custom.NotExistNicknameException;
import com.pickpack.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Slf4j
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

        if(joinReqDto.getNickname().length() == 0) throw new NotExistNicknameException("닉네임를 입력하지 않음");
        if(joinReqDto.getMid().length() == 0) throw new NotExistMIdException("아이디을 입력하지 않음");
        JoinRespDto joinRespDto = memberService.join(joinReqDto);
        log.info("회원가입 완료, 회원 - {}", joinReqDto.getNickname());

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
