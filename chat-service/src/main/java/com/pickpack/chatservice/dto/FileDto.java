package com.pickpack.chatservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
//TODO vo dto
public class FileDto implements Serializable {
    private String roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String name;
    private String type;
    private Long size;
    private String data;

}
