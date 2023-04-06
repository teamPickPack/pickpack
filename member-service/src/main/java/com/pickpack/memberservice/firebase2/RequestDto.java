package com.pickpack.memberservice.firebase2;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RequestDto {

    private Long memberId;
    private String body;
    private String targetToken;

}
