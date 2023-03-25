package com.pickpack.flightservice.api.response;

import com.pickpack.flightservice.dto.flight.TicketDto;
import com.pickpack.flightservice.entity.Ticket;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class TicketRes {
    private boolean isLike;
    private Ticket ticket;
//    private TicketDto ticket;
}
