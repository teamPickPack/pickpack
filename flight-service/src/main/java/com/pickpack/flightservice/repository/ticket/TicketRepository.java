package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long>, TicketRepositoryCustom {
    Optional<Ticket> findById(Long ticketId);
}
