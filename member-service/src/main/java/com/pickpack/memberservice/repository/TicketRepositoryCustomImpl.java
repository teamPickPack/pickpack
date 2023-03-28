package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.flight.TicketInfoDto;
import com.pickpack.memberservice.dto.flight.TicketLikeDto;
import com.pickpack.memberservice.entity.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pickpack.memberservice.entity.QFlight.flight;
import static com.pickpack.memberservice.entity.QOnewayTicketLike.onewayTicketLike;
import static com.pickpack.memberservice.entity.QTicket.ticket;
import static com.querydsl.core.group.GroupBy.groupBy;

public class TicketRepositoryCustomImpl implements TicketRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    public TicketRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }
    public List<TicketLikeDto> findOnewayTicketLike(Long memberId){

        List<TicketLikeDto> list = queryFactory
                .select(Projections.fields(TicketLikeDto.class,
                        onewayTicketLike.isDelete.as("isLike"),
                        onewayTicketLike.wantedPrice,
                        ticket.id.as("ticketId")
                        )
                ).from(ticket)
                .join(ticket.onewayTicketLikeList, onewayTicketLike)
                .on(onewayTicketLike.member.id.eq(memberId))
                .fetch();

        return list;
    }

    public TicketInfoDto findTicketInfo(Long ticketId){

        TicketInfoDto ticketInfoDto = queryFactory
                .select(Projections.fields(TicketInfoDto.class,
                        ticket.id,
                        ticket.price,
                        ticket.waypointNum,
                        ticket.registDate,
                        ticket.totalTime,
                        ticket.codeshare,
                        ticket.airline,
                        ticket.depTime,
                        ticket.depDate,
                        ticket.depName,
                        ticket.depCode,
                        ticket.arrTime,
                        ticket.arrDate,
                        ticket.arrName,
                        ticket.arrCode,
                        ticket.plusDate,
                        ticket.totalTimeNum
                        )
                ).from(ticket)
                .where(ticket.id.eq(ticketId))
                .fetchOne();

        return ticketInfoDto;
    }

    public List<Flight> findOnewayTicketLikeAboutFlight(Long ticketId){

        List<Flight> flightList = queryFactory
                .select(flight)
                .from(ticket)
                .join(ticket.flightList, flight)
                .on(flight.ticketId.eq(ticketId))
                .fetch();

        return flightList;
    }

}
