package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //경유 : 전체
    //priceRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유 필터 전체

    //depTimeEarly
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //depTimeLate
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int minPrice, int maxPrice);

    //flightTimeRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //경유 : 0, 1
    //priceRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유 필터 다중 선택

    //depTimeEarly
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //경유 : 2 이상
    //priceRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유 필터 다중 선택

    //depTimeEarly
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);
}
