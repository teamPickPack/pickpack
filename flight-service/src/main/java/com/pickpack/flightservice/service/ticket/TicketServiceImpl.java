package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OneWayTicketReq;
import com.pickpack.flightservice.api.request.RoundTicketReq;
import com.pickpack.flightservice.api.response.OneWayTicketRes;
import com.pickpack.flightservice.api.response.RoundTicketRes;
import com.pickpack.flightservice.entity.Flight;
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
    public List<OneWayTicketRes> getOneWayTicketList(OneWayTicketReq ticketReq) {
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

                if(direct[i] && (i == 1 || i == 2)) {
                    switch (sortType) {
                        case "priceRow" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsAndPriceBetweenOrderByPriceAsc(departure, destination, date, i - 1, minPrice, maxPrice);
                            break;
                        }
                        case "gapHigh" : {
                            // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 경유 0, 1
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

                } else if(direct[i] && (i == 3)) {
                    switch (sortType) {
                        case "priceRow" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByPriceAsc(departure, destination, date, i - 1, minPrice, maxPrice);
                            break;
                        }
                        case "gapHigh" : {
                            // TODO : TicketRepository 메소드 구현 - Sort by gapHigh & 경유 2회 이상
                            tmp = null;
                            break;
                        }
                        case "depTimeEarly" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeAsc(departure, destination, date, 2, minPrice, maxPrice);
                            break;
                        }
                        case "depTimeLate" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByDepTimeDesc(departure, destination, date, 2, minPrice, maxPrice);
                            break;
                        }
                        case "flightTimeRow" : {
                            tmp = ticketRepository.findByDepCodeAndArrCodeAndDepDateAndWaypointNumIsGreaterThanEqualAndPriceBetweenOrderByTotalTimeNumAsc(departure, destination, date, 2, minPrice, maxPrice);
                            break;
                        }
                    }
                }

                if(tmp != null) ticketList.addAll(tmp);
            }
        }

        //결과값 반환
        List<OneWayTicketRes> result = new ArrayList<>();
        for(Ticket ticket : ticketList) {
            ticket.setWaypoints(wayPointToString(ticket.getFlightList()));

            OneWayTicketRes ticketRes = OneWayTicketRes.builder().
                    isLike(false) //TODO : isLike 일단 임시로 false
                    .ticket(ticket)
                    .build();

            result.add(ticketRes);
        }

        return result;
    }

    // TODO : TicketServiceImpl - getRoundTicketList
    @Override
    public List<RoundTicketRes> getRoundTicketList(RoundTicketReq ticketReq) {
        long memberId = ticketReq.getMemberId();
        //티켓 정보
        String departure = ticketReq.getInfo().getDeparture();
        String destination = ticketReq.getInfo().getDestination();
        String depDate = ticketReq.getInfo().getDepDate();
        String arrDate = ticketReq.getInfo().getArrDate();
        //필터 정보
        boolean direct[] = ticketReq.getFilter().getDirect();
        int minPrice = ticketReq.getFilter().getMinPrice();
        int maxPrice = ticketReq.getFilter().getMaxPrice();
        String sortType = ticketReq.getSortType();

        //검색


        //결과값 반환

        return null;
    }

    private String wayPointToString(List<Flight> flightList) { //경유지 정해진 형식으로 변환
        String str = "";

        if(flightList != null) {
            for(int i = 1; i < flightList.size(); i++) {
                Flight flight = flightList.get(i);
                str += flight.getDepName() + "(" + flight.getDepCode() + ")";

                if(i != flightList.size() - 1) str += "/";
            }
            return str;
        } else {
            return "";
        }
    }

}
