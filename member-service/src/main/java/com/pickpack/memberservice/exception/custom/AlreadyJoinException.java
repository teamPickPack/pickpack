package com.pickpack.memberservice.exception.custom;

import com.pickpack.memberservice.entity.Member;

import java.util.function.Consumer;

public class AlreadyJoinException extends RuntimeException implements Consumer<Member> {

    public AlreadyJoinException(String message){
        super(message);
    }

    @Override
    public void accept(Member member) {

    }
}
