package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
