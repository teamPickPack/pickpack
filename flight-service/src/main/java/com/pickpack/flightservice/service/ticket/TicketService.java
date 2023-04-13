package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketReq;
import com.pickpack.flightservice.api.request.RoundTicketReq;
import com.pickpack.flightservice.api.response.OnewayTicketListRes;
import com.pickpack.flightservice.api.response.RoundTicketListRes;

import java.util.List;

public interface TicketService {
    OnewayTicketListRes getOneWayTicketList(OnewayTicketReq ticketReq);
    RoundTicketListRes getRoundTicketList(RoundTicketReq ticketReq);
}
