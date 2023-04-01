package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
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

    /**
     * 편도찜 조회
     */
    @GetMapping("/{memberId}/one-flight")
    public ResponseEntity<?> findOneFlightLike(@PathVariable Long memberId){
        List<OnewayDto> onewayDtos = flightService.findlikeTicket(memberId);

        return new ResponseEntity<>(onewayDtos, HttpStatus.OK);
    }

    /**
     * 왕복찜 조회
     */
    @GetMapping("/{memberId}/round-flight")
    public ResponseEntity<?> findTwoFlightLike(@PathVariable Long memberId){
        List<TwowayDto> twowayDtos = flightService.findLikeRoundTicket(memberId);

        return new ResponseEntity<>(twowayDtos, HttpStatus.OK);
    }

}
