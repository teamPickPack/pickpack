package com.pickpack.flightservice.api.request;

import lombok.Getter;

@Getter
public class OnewayTicketLikeReq {
    private Long ticketId;
    private Long memberId;
}
