package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //priceRow & 직항
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 직항

    //depTimeEarly & 직항
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate & 직항
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow & 직항
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //priceRow & 경유
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유

    //depTimeEarly & 경유
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate & 경유
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow & 경유
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

}
