package com.pickpack.memberservice.dto.flight;


import lombok.*;

@Data
@NoArgsConstructor
public class TicketInfoDto {
    private Long ticketId;
    private Integer price;
    private Integer waypointNum;
    private String registDate;
    private String totalTime;
    private Boolean codeshare;
    private String airline;
    private String depTime;
    private String depDate;
    private String depName;
    private String depCode;
    private String arrTime;
    private String arrDate;
    private String arrName;
    private String arrCode;
    private Integer plusDate;
    private Integer totalTimeNum;


}
