package com.pickpack.flightservice.api.response;

import com.pickpack.flightservice.dto.flight.TicketDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class TicketRes {
    private boolean isLike;
    private TicketDto ticket;
}
