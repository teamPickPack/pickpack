package com.pickpack.memberservice.jwt;

public class JwtVO {

    public static final String SECRET = "pickpack";     // HS256 대칭키
    public static final int EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 10;     // 10일간 유지
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER = "Authorization";


}
