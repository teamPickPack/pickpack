package com.pickpack.memberservice.exception.custom;

public class NotExistNicknameException extends RuntimeException{

    public NotExistNicknameException(String message){
        super(message);
    }

}
