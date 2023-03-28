package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.flight.RoundTicketLikeDto;
import com.pickpack.memberservice.dto.flight.TicketInfoDto;
import com.pickpack.memberservice.dto.flight.TicketLikeDto;
import com.pickpack.memberservice.entity.Flight;
import com.pickpack.memberservice.entity.Ticket;

import java.util.List;

public interface TicketRepositoryCustom {

    List<TicketLikeDto> findOnewayTicketLike(Long memberId);

    List<Flight> findTicketLikeAboutFlight(Long ticketId);

    TicketInfoDto findTicketInfo(Long ticketId);

    List<RoundTicketLikeDto> findRoundwayTicketLike(Long memberId);

}
