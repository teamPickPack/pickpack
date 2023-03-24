package com.pickpack.flightservice.service.tourist;

import com.pickpack.flightservice.entity.Continent;
import com.pickpack.flightservice.entity.Tourist;
import com.pickpack.flightservice.repository.tourist.TouristRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TouristService {
    private final TouristRepository touristRepository;

    public List<Tourist> getTouristsByContinent(String continent){
        return touristRepository.findByContinent(getContinent(continent));
    }
    public Continent getContinent(String str){
        switch (str){
            case "남아메리카": return Continent.SAMERICA;
            case "북아메리카": return Continent.NAMERICA;
            case "아프리카": return Continent.AFRICA;
            case "아시아": return Continent.ASIA;
            case "유럽": return Continent.EUROPE;
            case "오세아니아": return Continent.OCEANIA;
            default:
                return null;
        }
    }



}
