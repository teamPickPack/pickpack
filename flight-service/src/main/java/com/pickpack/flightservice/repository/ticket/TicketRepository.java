package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //priceRow & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 직항

    //depTimeEarly & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //priceRow & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유

    //depTimeEarly & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

}
