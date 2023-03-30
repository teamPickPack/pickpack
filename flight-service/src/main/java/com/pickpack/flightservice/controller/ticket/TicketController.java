package com.pickpack.flightservice.controller.ticket;

import com.pickpack.flightservice.api.request.OneWayTicketReq;
import com.pickpack.flightservice.api.request.OnewayTicketLikeReq;
import com.pickpack.flightservice.api.request.RoundTicketReq;
import com.pickpack.flightservice.api.response.OneWayTicketRes;
import com.pickpack.flightservice.api.response.RoundTicketRes;
import com.pickpack.flightservice.service.ticket.TicketLikeService;
import com.pickpack.flightservice.service.ticket.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/flight")
public class TicketController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private TicketService ticketService;
    private TicketLikeService ticketLikeService;

    @PostMapping("/one")
    public ResponseEntity<?> oneWayTicketList(@RequestBody OneWayTicketReq ticketReq) {
        try {
            List<OneWayTicketRes> list = ticketService.getOneWayTicketList(ticketReq);

            if (list != null && !list.isEmpty()) {
                return new ResponseEntity<List<OneWayTicketRes>>(list, HttpStatus.OK);
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
            List<RoundTicketRes> list = ticketService.getRoundTicketList(ticketReq);

            if (list != null && !list.isEmpty()) {
                return new ResponseEntity<List<RoundTicketRes>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @PostMapping("/like")
    public HttpEntity<?> likeOnewayTicket(@RequestBody OnewayTicketLikeReq onewayTicketLikeReq) {
        try{
            ticketLikeService.likeOnewayTicket(onewayTicketLikeReq);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }catch(Exception e){
            return exceptionHandling(e);
        }
    }

    @PutMapping("/like")
    public HttpEntity<?> unLikeOnewayTicket(@RequestBody OnewayTicketLikeReq onewayTicketLikeReq) {
        try{
            ticketLikeService.unLikeOneWayTicket(onewayTicketLikeReq);
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
