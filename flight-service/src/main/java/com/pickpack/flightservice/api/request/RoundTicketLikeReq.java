package com.pickpack.flightservice.api.request;

import lombok.Getter;

@Getter
public class RoundTicketLikeReq {
    private Long ticketToId;
    private Long ticketFromId;
    private Long memberId;
}
