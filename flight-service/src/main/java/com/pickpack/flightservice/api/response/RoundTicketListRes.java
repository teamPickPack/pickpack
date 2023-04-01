package com.pickpack.flightservice.api.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RoundTicketListRes {
    private Long totalCount;
    private List<RoundTicketRes> ticketList;
}
