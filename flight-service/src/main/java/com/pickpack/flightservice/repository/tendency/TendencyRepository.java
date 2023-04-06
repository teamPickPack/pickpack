package com.pickpack.flightservice.repository.tendency;

import com.pickpack.flightservice.entity.Tendency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TendencyRepository extends JpaRepository<Tendency, Long> {
    List<Tendency> findByTicketId(Long ticketId);
}
