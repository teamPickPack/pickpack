package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
import com.pickpack.memberservice.entity.*;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pickpack.memberservice.entity.QFlight.flight;
import static com.pickpack.memberservice.entity.QMember.member;
import static com.pickpack.memberservice.entity.QOnewayTicketLike.onewayTicketLike;
import static com.pickpack.memberservice.entity.QRoundTicketLike.roundTicketLike;
import static com.pickpack.memberservice.entity.QTicket.ticket;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.set;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;

public class TicketRepositoryCustomImpl implements TicketRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    public TicketRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    /**
     * 해당 회원의 편도찜 찾기
     * @param memberId : 회원 아이디
     * @return
     */
    public List<OnewayDto> findOnewayTicketLike(Long memberId){

        List<OnewayDto> list = queryFactory
                .select(Projections.fields(OnewayDto.class,
                        onewayTicketLike.isDelete.as("isLike"),
                        onewayTicketLike.wantedPrice,
                        onewayTicketLike.ticket
                        )
                ).from(member)
                .join(member.onewayTicketLikeList, onewayTicketLike)
                .on(member.id.eq(memberId))
                .join(onewayTicketLike.ticket, ticket)
                .fetch();

        return list;
    }

    /**
     * 해당 회원의 왕복찜 찾기
     * @param memberId : 회원 아이디
     * @return
     */
    public List<TwowayDto> findTwoWayTicketLike(Long memberId) {

        List<TwowayDto> list = queryFactory
                .select(Projections.fields(TwowayDto.class,
                        roundTicketLike.isDelete.as("isLike"),
                        roundTicketLike.wantedPrice,
                        roundTicketLike.ticketTo.as("goWay"),
                        roundTicketLike.ticketFrom.as("returnWay")
                        )
                ).from(member)
                .join(member.roundTicketLikeList, roundTicketLike)
                .on(member.id.eq(memberId))
                .join(roundTicketLike.ticketTo, ticket)
                .fetch();

        return list;
    }

}
