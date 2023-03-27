package com.pickpack.flightservice.api.request;

import com.pickpack.flightservice.dto.flight.FilterDto;
import com.pickpack.flightservice.dto.flight.RoundInfoDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RoundTicketReq {
    private long memberId;
    private RoundInfoDto info;
    private FilterDto filter;
    private String sortType;
}
