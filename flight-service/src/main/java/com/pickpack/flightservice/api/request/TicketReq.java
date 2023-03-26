package com.pickpack.flightservice.api.request;

import com.pickpack.flightservice.dto.flight.FilterDto;
import com.pickpack.flightservice.dto.flight.OneWayInfoDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TicketReq {
    private long memberId;
    private OneWayInfoDto info;
    private FilterDto filter;
    private String sortType;
}
