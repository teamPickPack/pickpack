package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketReq;
import com.pickpack.flightservice.api.request.RoundTicketReq;
import com.pickpack.flightservice.api.response.OneWayTicketRes;
import com.pickpack.flightservice.api.response.RoundTicketRes;
import com.pickpack.flightservice.entity.*;
import com.pickpack.flightservice.repository.MemberRepository;
import com.pickpack.flightservice.repository.ticket.OnewayTicketLikeRepository;
import com.pickpack.flightservice.repository.ticket.RoundTicketLikeRepository;
import com.pickpack.flightservice.repository.ticket.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    OnewayTicketLikeRepository onewayTicketLikeRepository;

    @Autowired
    RoundTicketLikeRepository roundTicketLikeRepository;

    @Override
    public List<OneWayTicketRes> getOneWayTicketList(OnewayTicketReq ticketReq) {
        long memberId = ticketReq.getMemberId();

        String departure = ticketReq.getInfo().getDeparture();
        String destination = ticketReq.getInfo().getDestination();
        String date = ticketReq.getInfo().getDate();

        boolean direct[] = ticketReq.getFilter().getDirect();
        int minPrice = ticketReq.getFilter().getMinPrice();
        int maxPrice = ticketReq.getFilter().getMaxPrice();

        String sortType = ticketReq.getPageable().getSortType();
        String orderBy = ticketReq.getPageable().getOrderBy();
        int page = ticketReq.getPageable().getPage();

        PageRequest pageRequest = PageRequest.of(page, 10, Sort.Direction.fromString(orderBy), sortType);

        //검색
        List<Ticket> ticketList = new ArrayList<>();

        if(direct[0]) { //경유 필터 : 전체
            ticketList = ticketRepository.findAllTickets(pageRequest, departure, destination, date, minPrice, maxPrice);
        }else { //경유 필터 : 직항, 경유 1회, 경유 2회 이상
            for(int i = 1;  i < direct.length; i++) {
                List<Ticket> tmp = new ArrayList<>();

                if(direct[i] && (i == 1 || i == 2)) { //직항, 경유 1회
                    tmp = ticketRepository.findWaypoint0or1Tickets(pageRequest, departure, destination, date, minPrice, maxPrice, i - 1);
                } else if(direct[i] && (i == 3)) { //경유 2회 이상
                    tmp = ticketRepository.findWaypointIsGraterThanTickets(pageRequest, departure, destination, date, minPrice, maxPrice, 1);
                }

                if(tmp != null) ticketList.addAll(tmp);
            }
        }

        //결과값 반환
        Member member = memberRepository.getById(memberId);

        List<OneWayTicketRes> result = new ArrayList<>();
        for(Ticket ticket : ticketList) {
            ticket.setWaypoints(wayPointToString(ticket.getFlightList()));

            boolean isLike = false; //항공권 찜여부
            OnewayTicketLike onewayTicketLike = onewayTicketLikeRepository.findByTicketIdAndMember(ticket.getId(), member);
            if(onewayTicketLike != null) isLike = true;

            OneWayTicketRes ticketRes = OneWayTicketRes.builder().
                    isLike(isLike)
                    .ticket(ticket)
                    .build();

            result.add(ticketRes);
        }

        return result;
    }

    @Override
    public List<RoundTicketRes> getRoundTicketList(RoundTicketReq ticketReq) {
        long memberId = ticketReq.getMemberId();
        Member member = memberRepository.getById(memberId);
        //티켓 정보
        String departure = ticketReq.getInfo().getDeparture();
        String destination = ticketReq.getInfo().getDestination();
        String depDate = ticketReq.getInfo().getDepDate();
        String arrDate = ticketReq.getInfo().getArrDate();
        //필터 정보
        boolean direct[] = ticketReq.getFilter().getDirect();
        int minPrice = ticketReq.getFilter().getMinPrice();
        int maxPrice = ticketReq.getFilter().getMaxPrice();
        //패이징 정보
        String sortType = ticketReq.getPageable().getSortType();
        String orderBy = ticketReq.getPageable().getOrderBy();
        int page = ticketReq.getPageable().getPage();

        PageRequest pageRequest = PageRequest.of(page, 10, Sort.Direction.fromString(orderBy), sortType);

        //검색
        List<RoundTicketRes> result = new ArrayList<>();

        List<Ticket> goWayTicketList = new ArrayList<>();
        List<Ticket> returnWayTicketList = new ArrayList<>();

        if(direct[0]) { //경유 필터 : 전체
            goWayTicketList = ticketRepository.findAllTickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice);
            returnWayTicketList = ticketRepository.findAllTickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice);
        }else { //경유 필터 : 직항, 경유 1회, 경유 2회 이상
            for(int i = 1;  i < direct.length; i++) {
                List<RoundTicketRes> tmp = new ArrayList<>();

                //조합의 수마다 또 항공권 조합해야함
                if(direct[i] && (i == 1)) { //직항
                    goWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice, 0);
                    returnWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice, 0);
                
                    //조합하기
                    tmp = combine(goWayTicketList, returnWayTicketList, member);
                    result.addAll(tmp);
                } else if(direct[i] && (i == 2)) { //경유 1회
                    //출국편 경유 0회, 귀국편 경유 1회
                    goWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice, 0);
                    returnWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice, 1);

                    tmp = combine(goWayTicketList, returnWayTicketList, member);
                    result.addAll(tmp);

                    //출국편 경유 1회, 귀국편 경유 0회
                    goWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice, 1);
                    returnWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice, 0);

                    tmp = combine(goWayTicketList, returnWayTicketList, member);
                    result.addAll(tmp);
                }
                else if(direct[i] && (i == 3)) { //경유 2회 이상
                    //출국편 경유 0회, 귀국편 경유 2회 이상
                    goWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice, 0);
                    returnWayTicketList = ticketRepository.findWaypointIsGraterThanTickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice, 1);

                    tmp = combine(goWayTicketList, returnWayTicketList, member);
                    result.addAll(tmp);

                    //출국편 경유 2회 이상, 귀국편 경유 0회
                    goWayTicketList = ticketRepository.findWaypointIsGraterThanTickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice, 1);
                    returnWayTicketList = ticketRepository.findWaypoint0or1Tickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice, 0);

                    tmp = combine(goWayTicketList, returnWayTicketList, member);
                    result.addAll(tmp);

                    //출국편 경유 1회 이상, 귀국편 경유 1회
                    goWayTicketList = ticketRepository.findWaypointIsGraterThanTickets(pageRequest, "ICN", destination, depDate, minPrice, maxPrice, 0);
                    returnWayTicketList = ticketRepository.findWaypointIsGraterThanTickets(pageRequest, destination, "ICN", arrDate, minPrice, maxPrice, 0);

                    tmp = combine(goWayTicketList, returnWayTicketList, member);
                    result.addAll(tmp);
                }
            }
        }

        //결과값 반환
        return result;
    }

    private List<RoundTicketRes> combine(List<Ticket> goWayTicketList, List<Ticket> returnWayTicketList, Member member) {
        List<RoundTicketRes> result = new ArrayList<>();

       for(Ticket goWayTicket : goWayTicketList) {
           goWayTicket.setWaypoints(wayPointToString(goWayTicket.getFlightList()));

           for(Ticket returnWayTicket : returnWayTicketList) {
               returnWayTicket.setWaypoints(wayPointToString(returnWayTicket.getFlightList()));

               boolean isLike = false; //항공권 찜여부
               RoundTicketLike roundTicketLike = roundTicketLikeRepository.findByTicketToIdAndTicketFromIdAndMember(goWayTicket.getId(), returnWayTicket.getId(), member);
               if(roundTicketLike != null) isLike = true;

               RoundTicketRes ticketRes = RoundTicketRes.builder().
                       isLike(isLike)
                       .goWay(goWayTicket)
                       .returnWay(returnWayTicket)
                       .totalPrice(goWayTicket.getPrice() + returnWayTicket.getPrice())
                       .build();

               result.add(ticketRes);
           }
       }

        return result;
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
