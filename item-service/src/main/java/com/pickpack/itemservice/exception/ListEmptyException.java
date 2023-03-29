package com.pickpack.itemservice.exception;

public class ListEmptyException extends RuntimeException{
    public ListEmptyException(String message) {
        super(message);
    }
}
