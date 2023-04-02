package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.entity.OnewayTicketLike;
import com.pickpack.memberservice.entity.RoundTicketLike;
import com.pickpack.memberservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TicketRepository extends JpaRepository<Ticket, Long> , TicketRepositoryCustom{

    @Query("select ol from OnewayTicketLike ol where ol.member.id = :memberId and ol.id = :ticketId")
    OnewayTicketLike CheckOnewayLike(@Param("memberId")Long memeberId, @Param("ticketId")Long ticketId);

    @Query("select rl from RoundTicketLike rl where rl.member.id = :memberId and rl.id = :ticketId")
    RoundTicketLike CheckRoundwayLike(@Param("memberId")Long memberId, @Param("ticketId")Long ticketId);
}
