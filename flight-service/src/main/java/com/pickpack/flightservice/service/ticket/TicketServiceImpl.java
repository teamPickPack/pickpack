package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.repository.ticket.TicketRepository;
import com.pickpack.flightservice.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    TicketRepository ticketRepository;
}
