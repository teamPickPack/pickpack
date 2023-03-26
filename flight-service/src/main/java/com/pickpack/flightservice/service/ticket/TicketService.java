package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.TicketReq;
import com.pickpack.flightservice.api.response.TicketRes;
import com.pickpack.flightservice.entity.Ticket;

import java.util.List;

public interface TicketService {
    List<TicketRes> getTicketList(TicketReq ticketReq);
}
