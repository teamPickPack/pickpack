package com.pickpack.flightservice.service.tourist;

import com.pickpack.flightservice.entity.Continent;
import com.pickpack.flightservice.entity.Tourist;
import com.pickpack.flightservice.repository.tourist.TouristRepository;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TouristService {
    private final TouristRepository touristRepository;

    @Cacheable(value = "List<Tourist>", key = "#continent")
    public List<Tourist> getTouristsByContinent(String continent){
        return touristRepository.findByContinent(getContinent(continent));
    }
    public Continent getContinent(String str){
        switch (str){
            case "samerica": return Continent.SAMERICA;
            case "namerica": return Continent.NAMERICA;
            case "africa": return Continent.AFRICA;
            case "asia": return Continent.ASIA;
            case "europe": return Continent.EUROPE;
            case "oceania": return Continent.OCEANIA;
            default:
                return null;
        }
    }



}
