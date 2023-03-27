package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OneWayTicketReq;
import com.pickpack.flightservice.api.request.RoundTicketReq;
import com.pickpack.flightservice.api.response.TicketRes;

import java.util.List;

public interface TicketService {
    List<TicketRes> getOneWayTicketList(OneWayTicketReq ticketReq);
    List<TicketRes> getRoundTicketList(RoundTicketReq ticketReq);
}
