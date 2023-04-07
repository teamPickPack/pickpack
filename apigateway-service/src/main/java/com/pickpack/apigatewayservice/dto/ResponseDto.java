package com.pickpack.memberservice.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class ResponseDto<T> {

    private final Integer code;     // 성공 1,  실패 -1
    private final String msg;
    private final T data;

}
