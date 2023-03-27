package com.pickpack.flightservice.api.response;

import com.pickpack.flightservice.dto.flight.TicketDto;
import com.pickpack.flightservice.entity.Ticket;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@ToString
public class TicketRes {
    private boolean isLike;
    private Ticket ticket;
//    private TicketDto ticket;

    public TicketRes(boolean isLike, Ticket ticket) {
        this.isLike = isLike;
        this.ticket = ticket;
    }
}
