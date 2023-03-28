package com.pickpack.memberservice.service;


import com.pickpack.memberservice.dto.flight.GowayDto;
import com.pickpack.memberservice.dto.flight.ReturnWayDto;
import com.pickpack.memberservice.dto.flight.RoundTicketLikeDto;
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

        for(TicketLikeDto t : onewayTicketLikeList){
            t.setTicket(ticketRepository.findTicketInfo(t.getTicketId()));
            List<Flight> flightlist = ticketRepository.findTicketLikeAboutFlight(t.getTicketId());
            t.setFlightList(flightlist);
        }

        return onewayTicketLikeList;
    }

    @Transactional(readOnly = true)
    public List<RoundTicketLikeDto> findLikeRoundTicket(Long memberId){
        List<RoundTicketLikeDto> roundwayTicketLike = ticketRepository.findRoundwayTicketLike(memberId);
        System.out.println(1);

        for(RoundTicketLikeDto r : roundwayTicketLike){
            GowayDto gowayDto = GowayDto.builder()
                    .ticket(ticketRepository.findTicketInfo(r.getTicket_go()))
                    .flightList(ticketRepository.findTicketLikeAboutFlight(r.getTicket_go()))
                    .build();
            ReturnWayDto returnWayDto = ReturnWayDto.builder()
                    .ticket(ticketRepository.findTicketInfo(r.getTicket_come()))
                    .flightList(ticketRepository.findTicketLikeAboutFlight(r.getTicket_come()))
                    .build();
            r.setGoWay(gowayDto);
            r.setReturnWay(returnWayDto);
        }

        return roundwayTicketLike;
    }

}
