package com.pickpack.flightservice.controller.tendency;

import com.pickpack.flightservice.api.response.TendencyRes;
import com.pickpack.flightservice.service.tendency.TendencyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/flight")
public class TendencyController {

    private final TendencyService tendencyService;

    @GetMapping("/{ticket_id}")
    public ResponseEntity<?> getTendency(@PathVariable("ticket_id") Long ticketId){

        TendencyRes tendencyRes = tendencyService.getTendency(ticketId);
        if(tendencyRes == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(tendencyRes, HttpStatus.OK);
    }
}
