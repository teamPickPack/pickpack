package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //priceRow & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOOrderByPriceAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //TODO : gapHigh & 직항

    //depTimeEarly & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOOrderByDepTimeAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //depTimeLate & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOOrderByDepTimeDesc(String departure, String destination, String date, int minPrice, int maxPrice);

    //flightTimeRow & 직항
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIs0AndPriceBetweenOOrderByTotalTimeNumAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //priceRow & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsNot0AndPriceBetweenOOrderByPriceAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유

    //depTimeEarly & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsNot0AndPriceBetweenOOrderByDepTimeAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //depTimeLate & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsNot0AndPriceBetweenOOrderByDepTimeDesc(String departure, String destination, String date, int minPrice, int maxPrice);

    //flightTimeRow & 경유
    List<Ticket> findByDepNameAndArrNameAndDepDateAndWaypointNumIsNot0AndPriceBetweenOOrderByTotalTimeNumAsc(String departure, String destination, String date, int minPrice, int maxPrice);

}
