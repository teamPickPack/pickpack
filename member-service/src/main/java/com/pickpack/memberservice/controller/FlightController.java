package com.pickpack.memberservice.controller;

import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.RoundwayWishPriceDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
import com.pickpack.memberservice.dto.flight.OnewayWishPriceDto;
import com.pickpack.memberservice.service.FlightService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * onewayWishPrice 수정
     */
    @PutMapping("/{memberId}/onewayWish")
    public ResponseEntity<?> changeOnewayWishPrice(@PathVariable Long memberId,
                                                   @RequestBody OnewayWishPriceDto onewayWishPriceDto){
        flightService.changeOnePrice(memberId, onewayWishPriceDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    /**
     * roundwayWishPrice 수정
     */
    @PutMapping("/{memberId}/roundwayWish")
    public ResponseEntity<?> changeRoundwayWishPrice(@PathVariable Long memberId,
                                                     @RequestBody RoundwayWishPriceDto roundwayWishPriceDto){
        flightService.changeRoundPrice(memberId, roundwayWishPriceDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    /**
     * 편도찜 취소
     */
    @PutMapping("/{memberId}/one-flight/{onewayTicketLikeId}")
    public ResponseEntity<?> cancelOnewayLike(@PathVariable Long memberId,
                                              @PathVariable Long onewayTicketLikeId){
        flightService.cancelOneLike(memberId, onewayTicketLikeId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    /**
     * 왕복찜 취소
     */
    @PutMapping("/{memberId}/round-flight/{roundwayTicketLikeId}")
    public ResponseEntity<?> cancelRoundwayLike(@PathVariable Long memberId,
                                                @PathVariable Long roundwayTicketLikeId){
        flightService.cancelRoundLike(memberId, roundwayTicketLikeId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
