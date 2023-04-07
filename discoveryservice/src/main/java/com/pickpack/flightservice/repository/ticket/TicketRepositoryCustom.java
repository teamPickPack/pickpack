package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TicketRepositoryCustom {
    Page<Ticket> findAllTickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice);
    Page<Ticket> findWaypoint0or1Tickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice, int waypointNum);
    Page<Ticket> findWaypointIsGraterThanTickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice, int waypointNum);
}
