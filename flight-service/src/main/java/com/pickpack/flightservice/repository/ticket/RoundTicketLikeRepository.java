package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Member;
import com.pickpack.flightservice.entity.RoundTicketLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoundTicketLikeRepository extends JpaRepository<RoundTicketLike, Long> {
    RoundTicketLike save(RoundTicketLike roundTicketLike);
    RoundTicketLike findByTicketToIdAndTicketFromIdAndMember(Long ticketToId, Long ticketFromId, Member member);
}
