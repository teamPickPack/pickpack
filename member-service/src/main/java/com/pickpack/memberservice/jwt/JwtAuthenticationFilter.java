package com.pickpack.memberservice.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickpack.memberservice.auth.LoginUser;
import com.pickpack.memberservice.dto.member.LoginReqDto;
import com.pickpack.memberservice.dto.member.LoginRespDto;
import com.pickpack.memberservice.util.CustomResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
        setFilterProcessesUrl("/api/member/login");
        log.info("👕 JwtAuthenticationFilter -  로그인을 위한 jwt 토큰 필터 생성됨");
        this.authenticationManager = authenticationManager;
    }

    /**
     * /login(post) 요청시 일루옴. -> 일단 로그인 시도해보는 메서드
     *
     * @param request  : 로그인 하려는 유저의 json 내용이 들어옴.
     * @param response the response, which may be needed if the implementation has to do a
     *                 redirect as part of a multi-stage authentication process (such as OpenID).
     * @return
     * @throws AuthenticationException
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        log.info("🧣 attemptAuthentication -  로그인 가능한지 시도!!!");
        try {
            // 로그인 유저 객체로 만들기
            ObjectMapper om = new ObjectMapper();
            LoginReqDto loginReqDto = om.readValue(request.getInputStream(), LoginReqDto.class);

            // 강제 로그인
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginReqDto.getMid(), loginReqDto.getPwd());

            return authenticationManager.authenticate(authenticationToken);
            //1. DB에서 잘 조회 되었다면, successfulAuthentication 메서드 실행

        } catch (Exception e) {

            //2. DB에 없는 회원일 경우.
            // authenticationEntryPoint에 걸림 -> filter이기 때문에 ControllerAdvice로 잡을수가 없음.
            throw new InternalAuthenticationServiceException(e.getMessage());
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        log.info("👖 successfulAuthentication - 로그인 성공!");

        LoginUser loginMember = (LoginUser) authResult.getPrincipal();
        // 토큰 만들어서 헤더에 담기.
        String jwtToken = JwtProcess.create(loginMember);
        response.addHeader(JwtVO.HEADER, jwtToken);

        //Todo 응답 객체 만들기 <- jwt에 다 싫어보내는거 어때?
        LoginRespDto loginRespDto = new LoginRespDto();
        loginRespDto.setId(loginMember.getMember().getId());
        loginRespDto.setMid(loginMember.getMember().getMid());
        CustomResponseUtil.success(response, loginRespDto);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        log.info("⚽ successfulAuthentication - 로그인 실패!");

        CustomResponseUtil.fail(response, "로그인 실패", HttpStatus.UNAUTHORIZED);

    }

}
