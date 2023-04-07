package com.pickpack.itemservice.service.city;

import com.pickpack.itemservice.entity.City;
import com.pickpack.itemservice.repository.city.CityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CityService {
    private final CityRepository cityRepository;

    /**
     * @return 도시 이름으로 오름차순 정렬한 도시 목록
     */
    public List<City> getCityList(){
        List<City> all = cityRepository.findAll();
        log.info(all.toString());
        return cityRepository.findAll(Sort.by(Sort.Direction.ASC, "cityName"));
    }
}
