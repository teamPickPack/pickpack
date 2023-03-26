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
                case "priceRow" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(departure, destination, date, 0, minPrice, maxPrice);
                // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 직항
                case "gapHigh" : return null;
                case "depTimeEarly" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, 0, minPrice, maxPrice);
                case "depTimeLate" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, 0, minPrice, maxPrice);
                case "flightTimeRow" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, 0, minPrice, maxPrice);
            }
        } else {
            switch (sortType) {
                case "priceRow" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByPriceAsc(departure, destination, date, 1, minPrice, maxPrice);
                // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 경유
                case "gapHigh" : return null;
                case "depTimeEarly" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, 1, minPrice, maxPrice);
                case "depTimeLate" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, 1, minPrice, maxPrice);
                case "flightTimeRow" : ticketList = ticketRepository.findByDepNameAndArrNameAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, 1, minPrice, maxPrice);
            }
        }

        //결과값 반환
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
