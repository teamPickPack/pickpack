package com.pickpack.flightservice.api.request;

import com.pickpack.flightservice.dto.flight.FilterDto;
import com.pickpack.flightservice.dto.flight.OneWayInfoDto;
import com.pickpack.flightservice.dto.flight.PageableDto;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class OneWayTicketReq {
    private long memberId;
    private OneWayInfoDto info;
    private FilterDto filter;
    private PageableDto pageable;
}
