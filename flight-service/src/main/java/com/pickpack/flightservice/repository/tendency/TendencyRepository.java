package com.pickpack.flightservice.repository.tendency;

import com.pickpack.flightservice.entity.Tendency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TendencyRepository extends JpaRepository<Tendency, Long> {
    Tendency findByTicketId(Long ticketId);
}
