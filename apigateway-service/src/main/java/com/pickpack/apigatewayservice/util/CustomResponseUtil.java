package com.pickpack.memberservice.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickpack.memberservice.dto.ResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;

public class CustomResponseUtil {
    private static final Logger log = LoggerFactory.getLogger(CustomResponseUtil.class);

    public static void success(HttpServletResponse response, Object dto){
        try{
            ObjectMapper om = new ObjectMapper();
            ResponseDto<?> responseDto = new ResponseDto<>(1, "로그인 성공", dto);
            String ResponseBody = om.writeValueAsString(responseDto);   // json으로 변경.

            response.setContentType("application/json; charset=UTF-8");
            response.setStatus(200);
            response.getWriter().println(ResponseBody);
        }catch(Exception e){
            log.error("서버 파싱 에러");
        }
    }

    public static void fail(HttpServletResponse response, String msg, HttpStatus httpStatus){
        try{
            ObjectMapper om = new ObjectMapper();
            ResponseDto<?> responseDto = new ResponseDto<>(-1, msg, null);
            String ResponseBody = om.writeValueAsString(responseDto);   // json으로 변경.

            response.setContentType("application/json; charset=UTF-8");
            response.setStatus(httpStatus.value());
            response.getWriter().println(ResponseBody);
        }catch(Exception e){
            log.error("서버 파싱 에러");
        }
    }


}
