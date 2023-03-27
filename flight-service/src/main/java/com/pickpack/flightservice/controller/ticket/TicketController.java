package com.pickpack.flightservice.controller.ticket;

import com.pickpack.flightservice.api.request.TicketReq;
import com.pickpack.flightservice.api.response.TicketRes;
import com.pickpack.flightservice.service.ticket.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/flight")
public class TicketController {
    private TicketService ticketService;

    @PostMapping("/one")
    public ResponseEntity<?> list(@RequestBody TicketReq ticketReq) {
        try {
            System.out.println("ticketService - list 실행");
            List<TicketRes> list = ticketService.getTicketList(ticketReq);

            if (list != null && !list.isEmpty()) {
                return new ResponseEntity<List<TicketRes>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
