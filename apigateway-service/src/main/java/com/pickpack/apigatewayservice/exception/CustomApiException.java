package com.pickpack.memberservice.exception;

import com.pickpack.memberservice.api.commonApi.ErrorApi;
import com.pickpack.memberservice.exception.custom.*;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomApiException {

    private final Logger log = LoggerFactory.getLogger(getClass());

    // 이미 삭제된 티켓일때
    @ExceptionHandler(AlreadyDeleteTicketException.class)
    public ResponseEntity<?> apiException6(AlreadyDeleteTicketException e){
        log.error(e.getMessage());
        return new ResponseEntity<>(new ErrorApi("이미 삭제된 티켓입니다."), HttpStatus.BAD_REQUEST);
    }

    // 동일한 닉네임이 존재할때
    @ExceptionHandler(AlreadyNicknameException.class)
    public ResponseEntity<?> apiException(AlreadyNicknameException e){
        log.error(e.getMessage());
        return new ResponseEntity<>(new ErrorApi("동일한 닉네임이 이미 존재합니다."), HttpStatus.BAD_REQUEST);
    }

    // 동일한 아이디가 존재할때
    @ExceptionHandler(AlreadyMIdException.class)
    public ResponseEntity<?> apiException2(AlreadyMIdException e){
        log.error(e.getMessage());
        return new ResponseEntity<>(new ErrorApi("동일한 아이디가 존재합니다."), HttpStatus.BAD_REQUEST);
    }

    // 회원이 없을때
    @ExceptionHandler(NotFoundMemberException.class)
    public ResponseEntity<?> apiException3(NotFoundMemberException e){
        log.error(e.getMessage());
        return new ResponseEntity<>(new ErrorApi("존재하지 않는 회원입니다."), HttpStatus.BAD_REQUEST);
    }

    // 회원가입 - mid를 입력하지 않았을 때
    @ExceptionHandler(NotExistMIdException.class)
    public ResponseEntity<?> apiException4(NotExistMIdException e){
        log.error(e.getMessage());
        return new ResponseEntity<>(new ErrorApi("아이디를 입력해주세요."), HttpStatus.BAD_REQUEST);
    }

    // 회원가입 - nickname을 입력하지 않았을 때
    @ExceptionHandler(NotExistNicknameException.class)
    public ResponseEntity<?> apiException5(NotExistNicknameException e){
        log.error(e.getMessage());
        return new ResponseEntity<>(new ErrorApi("닉네임을 입력해주세요"), HttpStatus.BAD_REQUEST);
    }

}
