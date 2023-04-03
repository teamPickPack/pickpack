package com.pickpack.itemservice.controller.city;

import com.pickpack.itemservice.api.response.CityListRes;
import com.pickpack.itemservice.api.response.ListRes;
import com.pickpack.itemservice.entity.City;
import com.pickpack.itemservice.exception.ListEmptyException;
import com.pickpack.itemservice.service.city.CityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/item")
public class CityController {
    private final CityService cityService;

    @GetMapping()
    public ResponseEntity<?> getCityList(){
        List<City> cityList = cityService.getCityList();

        if(cityList.isEmpty()){
            String errMsg = "도시 목록이 없습니다.";
            exceptionHandling(new ListEmptyException(errMsg));
            return new ResponseEntity<String>("Error : " + errMsg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new CityListRes(cityList), HttpStatus.OK);
    }

    private void exceptionHandling(Exception e) {
        e.printStackTrace();
    }

}
