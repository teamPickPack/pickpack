package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {


}
