package com.pickpack.memberservice.exception.custom;

public class AlreadyDeleteTicketException extends RuntimeException{

    public AlreadyDeleteTicketException(String message){
        super(message);
    }

}
