package com.pickpack.memberservice.dto;

import com.pickpack.memberservice.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRespDto {

    private Long memberId;
    private String mid;
    private String nickname;

    public JoinRespDto(Member member){
        this.memberId = member.getId();
        this.mid = member.getMid();
        this.nickname = member.getNickname();
    }
}
