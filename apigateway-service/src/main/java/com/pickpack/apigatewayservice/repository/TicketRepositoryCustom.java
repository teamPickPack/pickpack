package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
import com.pickpack.memberservice.entity.Flight;
import com.pickpack.memberservice.entity.OnewayTicketLike;

import java.util.List;

public interface TicketRepositoryCustom {

    List<OnewayDto> findOnewayTicketLike(Long memberId);

    List<TwowayDto> findTwoWayTicketLike(Long memberId);

}
