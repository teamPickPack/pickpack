package com.pickpack.memberservice.service;


import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
import com.pickpack.memberservice.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FlightService {

    private final TicketRepository ticketRepository;

    @Transactional(readOnly = true)
    public List<OnewayDto> findlikeTicket(Long memberId) {
        List<OnewayDto> onewayTicketLike = ticketRepository.findOnewayTicketLike(memberId);
        return onewayTicketLike;
    }

    @Transactional(readOnly = true)
    public List<TwowayDto> findLikeRoundTicket(Long memberId){
        List<TwowayDto> twowayTicketLike = ticketRepository.findTwoWayTicketLike(memberId);
        System.out.println(twowayTicketLike);
        return twowayTicketLike;
    }

}
