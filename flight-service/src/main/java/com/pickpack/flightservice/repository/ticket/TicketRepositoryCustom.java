package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TicketRepositoryCustom {
    List<Ticket> findAllTickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice);
    List<Ticket> findWaypoint0or1Tickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice, int waypointNum);
    List<Ticket> findWaypointIsGraterThan1Tickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice);
}
