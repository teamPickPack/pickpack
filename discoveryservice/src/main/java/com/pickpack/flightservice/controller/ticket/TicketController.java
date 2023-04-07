package com.pickpack.flightservice.controller.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketReq;
import com.pickpack.flightservice.api.request.OnewayTicketLikeReq;
import com.pickpack.flightservice.api.request.RoundTicketLikeReq;
import com.pickpack.flightservice.api.request.RoundTicketReq;
import com.pickpack.flightservice.api.response.OnewayTicketListRes;
import com.pickpack.flightservice.api.response.RoundTicketListRes;
import com.pickpack.flightservice.service.ticket.TicketLikeService;
import com.pickpack.flightservice.service.ticket.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/flight")
public class TicketController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private TicketService ticketService;
    private TicketLikeService ticketLikeService;

    @PostMapping("/one")
    public ResponseEntity<?> oneWayTicketList(@RequestBody OnewayTicketReq ticketReq) {
        try {
            OnewayTicketListRes onewayTicketListRes = ticketService.getOneWayTicketList(ticketReq);

            if (onewayTicketListRes != null) {
                return new ResponseEntity<OnewayTicketListRes>(onewayTicketListRes, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @PostMapping("/round")
    public ResponseEntity<?> roundTicketList(@RequestBody RoundTicketReq ticketReq) {
        try {
            System.out.println("ticketService - roundTicketlist 실행");
            RoundTicketListRes roundTicketListRes = ticketService.getRoundTicketList(ticketReq);

            if (roundTicketListRes != null) {
                return new ResponseEntity<RoundTicketListRes>(roundTicketListRes, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @PostMapping("/one/like")
    public HttpEntity<?> likeOnewayTicket(@RequestBody OnewayTicketLikeReq onewayTicketLikeReq) {
        try{
            ticketLikeService.likeOnewayTicket(onewayTicketLikeReq);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    @PutMapping("/one/like")
    public HttpEntity<?> unLikeOnewayTicket(@RequestBody OnewayTicketLikeReq onewayTicketLikeReq) {
        try{
            ticketLikeService.unlikeOnewayTicket(onewayTicketLikeReq);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    @PostMapping("/round/like")
    public HttpEntity<?> likeRoundTicket(@RequestBody RoundTicketLikeReq roundTicketLikeReq) {
        try{
            ticketLikeService.likeRoundTicket(roundTicketLikeReq);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    @PutMapping("/round/like")
    public HttpEntity<?> unlikeRoundTicket(@RequestBody RoundTicketLikeReq roundTicketLikeReq) {
        try{
            ticketLikeService.unlikeRoundTicket(roundTicketLikeReq);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
