package com.pickpack.memberservice.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.api.client.googleapis.services.AbstractGoogleClient;
import com.pickpack.memberservice.auth.LoginUser;
import com.pickpack.memberservice.entity.Member;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;


@Slf4j
public class JwtProcess {

    // 토큰 생성
    public static String create(LoginUser loginUser){

        String jwtToken = JWT.create()
                .withSubject("PickPackToken")
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtVO.EXPIRATION_TIME))
                .withClaim("id", loginUser.getMember().getId())
                .sign(Algorithm.HMAC512(JwtVO.SECRET));
        return JwtVO.TOKEN_PREFIX+jwtToken;

    }

    // 토큰 검증 (return 되는 LoginUser 객체에 강제로 시큐리티 세션에 직접 주입)
    public static LoginUser verify(String token){
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtVO.SECRET)).build().verify(token);

        Long id = decodedJWT.getClaim("id").asLong();
        Member member = Member.builder().id(id).build();
        LoginUser loginUser = new LoginUser(member);
        return loginUser;
    }

}
