package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.TicketReq;
import com.pickpack.flightservice.api.response.TicketRes;
import com.pickpack.flightservice.entity.Ticket;
import com.pickpack.flightservice.repository.ticket.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    TicketRepository ticketRepository;

    @Override
    public List<TicketRes> getTicketList(TicketReq ticketReq) {
        System.out.println(ticketReq);

        long memberId = ticketReq.getMemberId();
        String departure = ticketReq.getInfo().getDeparture();
        String destination = ticketReq.getInfo().getDestination();
        String date = ticketReq.getInfo().getDate();
        String direct = ticketReq.getFilter().getDirect();
        int minPrice = ticketReq.getFilter().getMinPrice();
        int maxPrice = ticketReq.getFilter().getMaxPrice();
        String sortType = ticketReq.getSortType();

        List<Ticket> ticketList = new ArrayList<>();

        //검색
        if(direct.equals("직항")) {
            switch (sortType) {
                case "priceRow" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(departure, destination, date, 0, minPrice, maxPrice);
                    break;
                }
                case "gapHigh" : {
                    // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 직항
                    ticketList =  null;
                    break;
                }
                case "depTimeEarly" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, 0, minPrice, maxPrice);
                    System.out.println("switch 실행");
                    System.out.println(ticketList);
                    break;
                }
                case "depTimeLate" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, 0, minPrice, maxPrice);
                    break;
                }
                case "flightTimeRow" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, 0, minPrice, maxPrice);
                    break;
                }
            }
        } else {
            switch (sortType) {
                case "priceRow" : ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByPriceAsc(departure, destination, date, 1, minPrice, maxPrice);
                case "gapHigh" : {
                    // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 경유
                    ticketList = null;
                    break;
                }
                case "depTimeEarly" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, 1, minPrice, maxPrice);
                    break;
                }
                case "depTimeLate" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, 1, minPrice, maxPrice);
                    break;
                }
                case "flightTimeRow" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, 1, minPrice, maxPrice);
                    break;
                }
            }
        }

        //결과값 반환
        System.out.println("티켓리스트" + ticketList);

        List<TicketRes> result = new ArrayList<>();
        for(Ticket ticket : ticketList) {
            TicketRes ticketRes = TicketRes.builder().
                    isLike(false) //TODO : isLike 일단 임시로 false
                    .ticket(ticket)
                    .build();

            result.add(ticketRes);
        }

        return result;
    }

}
