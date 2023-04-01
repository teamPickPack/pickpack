package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
import com.pickpack.memberservice.entity.Flight;

import java.util.List;

public interface TicketRepositoryCustom {

    List<OnewayDto> findOnewayTicketLike(Long memberId);

    List<Flight> findTicketLikeAboutFlight(Long ticketId);

    List<TwowayDto> findTwoWayTicketLike(Long memberId);

}
