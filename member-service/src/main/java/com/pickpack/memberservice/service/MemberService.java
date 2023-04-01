package com.pickpack.memberservice.service;

import com.pickpack.memberservice.dto.member.FindRespDto;
import com.pickpack.memberservice.dto.member.JoinReqDto;
import com.pickpack.memberservice.dto.member.JoinRespDto;
import com.pickpack.memberservice.entity.Member;
import com.pickpack.memberservice.exception.custom.AlreadyJoinException;
import com.pickpack.memberservice.exception.custom.NotFoundMemberException;
import com.pickpack.memberservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public JoinRespDto join(JoinReqDto joinReqDto){
        // 동일 닉네임 검사
        Optional<Member> already_member = memberRepository.findByNickname(joinReqDto.getNickname());
        if(already_member.isPresent()){
            throw new AlreadyJoinException("동일한 nickname이 이미 존재합니다.");
        }
        
        // 패스워드 인코딩 -> 회원가입
        Member memberPS = memberRepository.save(joinReqDto.toEntity(bCryptPasswordEncoder));
//        Member memberPS = memberRepository.save(joinReqDto.toTestEntity());
        
        // 정상 dto 응답
        return new JoinRespDto(memberPS);
    }

    @Transactional(readOnly = true)
    public FindRespDto findMember(Long memberId){
        // 회원이 존재하는지 검사.
        Optional<Member> findedMember = memberRepository.findById(memberId);
        if(!findedMember.isPresent()){
            throw new NotFoundMemberException("존재하지 않는 회원입니다.");
        }
        return new FindRespDto(findedMember.get());
    }

}
