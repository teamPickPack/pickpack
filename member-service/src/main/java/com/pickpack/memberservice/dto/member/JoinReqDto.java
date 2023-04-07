package com.pickpack.memberservice.dto.member;

import com.pickpack.memberservice.entity.Member;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Setter
@Getter
public class JoinReqDto {

    private String mid;
    private String password;
    private String nickname;
    private String img_url;

    public Member toEntity(BCryptPasswordEncoder bCryptPasswordEncoder){
        return Member.builder()
                .mid(mid)
                .nickname(nickname)
                .password(bCryptPasswordEncoder.encode(password))
                .img_url(img_url)
                .build();
    }

//    public Member toTestEntity(){
//        return Member.builder()
//                .mid(mid)
//                .nickname(nickname)
//                .password(password)
//                .img_url(img_url)
//                .build();
//    }
}
