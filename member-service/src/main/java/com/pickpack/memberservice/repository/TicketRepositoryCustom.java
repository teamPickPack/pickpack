package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.flight.TicketInfoDto;
import com.pickpack.memberservice.dto.flight.TicketLikeDto;
import com.pickpack.memberservice.entity.Flight;
import com.pickpack.memberservice.entity.Ticket;

import java.util.List;

public interface TicketRepositoryCustom {

    List<TicketLikeDto> findOnewayTicketLike(Long memberId);

    List<Flight> findOnewayTicketLikeAboutFlight(Long ticketId);

    TicketInfoDto findTicketInfo(Long ticketId);

}
