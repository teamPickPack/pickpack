package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //경유 필터 전체 선택
    //priceRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유 필터 전체

    //depTimeEarly
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //depTimeLate
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int minPrice, int maxPrice);

    //flightTimeRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int minPrice, int maxPrice);

    //경유 필터 다중 선택
    //priceRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //TODO : gapHigh & 경유 필터 다중 선택

    //depTimeEarly
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //depTimeLate
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

    //flightTimeRow
    List<Ticket> findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(String departure, String destination, String date, int waypointNum, int minPrice, int maxPrice);

}
