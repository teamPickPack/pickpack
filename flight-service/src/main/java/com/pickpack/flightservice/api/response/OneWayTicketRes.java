package com.pickpack.flightservice.api.response;

import com.pickpack.flightservice.entity.Ticket;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class OneWayTicketRes {
    private boolean isLike;
    private Ticket ticket;

    @Builder
    public OneWayTicketRes(boolean isLike, Ticket ticket) {
        this.isLike = isLike;
        this.ticket = ticket;
    }
}
