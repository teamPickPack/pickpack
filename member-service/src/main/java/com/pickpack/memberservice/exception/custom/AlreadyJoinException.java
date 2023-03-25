package com.pickpack.memberservice.exception.custom;

public class AlreadyJoinException extends RuntimeException {

    public AlreadyJoinException(String message){
        super(message);
    }

}
