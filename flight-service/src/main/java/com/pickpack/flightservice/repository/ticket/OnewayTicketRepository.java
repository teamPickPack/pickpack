package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Member;
import com.pickpack.flightservice.entity.OnewayTicketLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OnewayTicketRepository extends JpaRepository<OnewayTicketLike, Long> {
    OnewayTicketLike save(OnewayTicketLike onewayTicketLike);
    OnewayTicketLike findByTicketIdAndMember(Long ticketId, Member member);
}
