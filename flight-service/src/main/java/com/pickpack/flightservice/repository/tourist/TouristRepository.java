package com.pickpack.flightservice.repository.tourist;

import com.pickpack.flightservice.entity.Continent;
import com.pickpack.flightservice.entity.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TouristRepository extends JpaRepository<Tourist, Long> {
    List<Tourist> findByContinent(Continent continent);
}
