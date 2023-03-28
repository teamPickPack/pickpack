package com.pickpack.memberservice.service;


import com.pickpack.memberservice.dto.flight.TicketLikeDto;
import com.pickpack.memberservice.entity.Flight;
import com.pickpack.memberservice.repository.FlightRepository;
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
    public List<TicketLikeDto> findlikeTicket(Long memberId) {
        List<TicketLikeDto> onewayTicketLikeList = ticketRepository.findOnewayTicketLike(memberId);
        System.out.println(onewayTicketLikeList.size());

        for(TicketLikeDto t : onewayTicketLikeList){
            t.setTicket(ticketRepository.findTicketInfo(t.getTicketId()));
            List<Flight> flightlist = ticketRepository.findOnewayTicketLikeAboutFlight(t.getTicketId());
            t.setFlightList(flightlist);
        }

        return onewayTicketLikeList;
    }

}
