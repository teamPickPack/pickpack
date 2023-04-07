package com.pickpack.memberservice.exception.custom;


public class AlreadyNicknameException extends RuntimeException {

    public AlreadyNicknameException(String message){
        super(message);
    }

}
