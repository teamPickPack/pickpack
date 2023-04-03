package com.pickpack.memberservice.dto.member;

import com.pickpack.memberservice.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class FindRespDto implements Serializable {

    private Long memberId;
    private String mid;
    private String pwd;
    private String nickname;
    private String img_url;

    public FindRespDto(Member member){
        this.memberId = member.getId();
        this.mid = member.getMid();
        this.pwd = member.getPwd();
        this.nickname = member.getNickname();
        this.img_url = member.getImg_url();
    }

}
