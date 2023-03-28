package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.api.flightApi.OneLikeTicketListApi;
import com.pickpack.memberservice.dto.flight.TicketLikeDto;
import com.pickpack.memberservice.service.FlightService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/member")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/health3")
    public String healthCheck(){
        return "this is flightController";
    }

    @GetMapping("/{memberId}/one-flight")
    public ResponseEntity<?> findOneFlightLike(@PathVariable Long memberId){

        List<TicketLikeDto> ticketLikeDtos = flightService.findlikeTicket(memberId);
        OneLikeTicketListApi oneLikeTicketListApi =
                OneLikeTicketListApi.builder().OneLikeTicketList(ticketLikeDtos).build();
        return new ResponseEntity<>(oneLikeTicketListApi, HttpStatus.OK);
    }

    @GetMapping("/{memberId}/round-flight")
    public void findTwoFlightLike(@PathVariable Long memberId){



    }

}
