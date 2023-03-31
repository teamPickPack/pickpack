package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Member;
import com.pickpack.flightservice.entity.OnewayTicketLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnewayTicketLikeRepository extends JpaRepository<OnewayTicketLike, Long> {
    OnewayTicketLike save(OnewayTicketLike onewayTicketLike);
    OnewayTicketLike findByTicketIdAndMember(Long ticketId, Member member);
}
