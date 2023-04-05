package com.pickpack.flightservice.controller.tourist;

import com.pickpack.flightservice.api.response.ListRes;
import com.pickpack.flightservice.entity.Tourist;
import com.pickpack.flightservice.service.tourist.TouristService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/flight")
@Slf4j
public class TouristController {
    private final TouristService touristService;

    @GetMapping(value ="/tourist/{continent}", produces="application/json;charset=UTF-8")
    public ResponseEntity<?> getTouristsByContinent(@PathVariable("continent") String continent){
        List<Tourist> touristList = touristService.getTouristsByContinent(continent);
        log.info("해당 대륙의 관광지의 갯수! : {}", touristList.size());
        if(touristList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new ListRes(touristList), HttpStatus.OK);
    }
}
