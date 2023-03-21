package com.pickpack.itemservice.service;

import com.pickpack.itemservice.entity.City;
import com.pickpack.itemservice.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepository cityRepository;

    public List<City> getCityList(){
        return cityRepository.findAll(Sort.by(Sort.Direction.ASC, "cityName"));
    }
}
