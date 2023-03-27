package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OneWayTicketReq;
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
    public List<TicketRes> getTicketList(OneWayTicketReq ticketReq) {
        System.out.println(ticketReq);

        long memberId = ticketReq.getMemberId();
        String departure = ticketReq.getInfo().getDeparture();
        String destination = ticketReq.getInfo().getDestination();
        String date = ticketReq.getInfo().getDate();
        boolean direct[] = ticketReq.getFilter().getDirect();
        int minPrice = ticketReq.getFilter().getMinPrice();
        int maxPrice = ticketReq.getFilter().getMaxPrice();
        String sortType = ticketReq.getSortType();

        List<Ticket> ticketList = new ArrayList<>();

        //검색
        if(direct[0]) { //경유 필터 : 전체
            switch (sortType) {
                case "priceRow" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByPriceAsc(departure, destination, date, minPrice, maxPrice);
                    break;
                }
                case "gapHigh" : {
                    // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 경유 필터 전체
                    ticketList =  null;
                    break;
                }
                case "depTimeEarly" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, minPrice, maxPrice);
                    System.out.println("switch 실행");
                    System.out.println(ticketList);
                    break;
                }
                case "depTimeLate" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, minPrice, maxPrice);
                    break;
                }
                case "flightTimeRow" : {
                    ticketList = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, minPrice, maxPrice);
                    break;
                }
            }
        }else { //경유 필터 : 직항, 경유 1회, 경유 2회 이상
            for(int i = 1;  i < direct.length; i++) {
                List<Ticket> tmp = new ArrayList<>();

                if(direct[i]) {
                    switch (sortType) {
                        case "priceRow" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(departure, destination, date, i - 1, minPrice, maxPrice);
                            break;
                        }
                        case "gapHigh" : {
                            // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 경유
                            tmp = null;
                            break;
                        }
                        case "depTimeEarly" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, i - 1, minPrice, maxPrice);
                            break;
                        }
                        case "depTimeLate" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, i - 1, minPrice, maxPrice);
                            break;
                        }
                        case "flightTimeRow" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, i - 1, minPrice, maxPrice);
                            break;
                        }
                    }

                    if(tmp != null) ticketList.addAll(tmp);
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
