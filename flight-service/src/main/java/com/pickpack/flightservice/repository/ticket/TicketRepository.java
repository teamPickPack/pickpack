package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //priceRow & 직항
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //TODO : gapHigh & 직항

    //depTimeEarly & 직항
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //depTimeLate & 직항
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int minPrice, int maxPrice);

    //flightTimeRow & 직항
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //priceRow & 경유
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqual1AndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유

    //depTimeEarly & 경유
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumNumIsGreaterThanEqual1AndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //depTimeLate & 경유
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumNumIsGreaterThanEqual1AndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int minPrice, int maxPrice);

    //flightTimeRow & 경유
//    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumNumIsGreaterThanEqual1AndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int minPrice, int maxPrice);

}
