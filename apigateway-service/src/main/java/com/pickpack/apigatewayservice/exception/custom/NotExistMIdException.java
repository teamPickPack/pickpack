package com.pickpack.memberservice.exception.custom;

public class NotExistMIdException extends RuntimeException{

    public NotExistMIdException(String message) {
        super(message);
    }
}
