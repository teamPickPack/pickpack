package com.pickpack.flightservice.repository.ticket;

import com.pickpack.flightservice.entity.Ticket;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.*;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.pickpack.flightservice.entity.QFlight.flight;
import static com.pickpack.flightservice.entity.QTendency.tendency;
import static com.pickpack.flightservice.entity.QTicket.ticket;

public class TicketRepositoryImpl implements TicketRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public TicketRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Ticket> findAllTickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice) {
        JPAQuery<Tuple> query  = queryFactory
                .select(ticket, ticket.tendency.chg)
                .from(ticket)
                .leftJoin(ticket.flightList, flight)
                .leftJoin(ticket.tendency, tendency)
                .where(ticket.depCode.eq(departure),
                        ticket.arrCode.eq(destination),
                        ticket.depDate.eq(date),
                        ticket.price.between(minPrice, maxPrice)
                )
                .distinct();

        sortAndOrder(query, pageable);

        List<Tuple> ticketList = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Ticket> result = new ArrayList<>();
        for (Tuple tuple : ticketList) {
            result.add(tuple.get(ticket));
        }

        Long totalCount =  queryFactory
                .select(ticket.countDistinct())
                .from(ticket)
                .leftJoin(ticket.flightList, flight)
                .leftJoin(ticket.tendency, tendency)
                .where(ticket.depCode.eq(departure),
                        ticket.arrCode.eq(destination),
                        ticket.depDate.eq(date),
                        ticket.price.between(minPrice, maxPrice)
                )
                .fetchOne();

        return new PageImpl<>(result, pageable, totalCount);
    }

    @Override
    public Page<Ticket> findWaypoint0or1Tickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice, int waypointNum) {
        JPAQuery<Tuple> query  = queryFactory
                .select(ticket, ticket.tendency.chg)
                .from(ticket)
                .leftJoin(ticket.flightList, flight)
                .leftJoin(ticket.tendency, tendency)
                .where(ticket.depCode.eq(departure),
                        ticket.arrCode.eq(destination),
                        ticket.depDate.eq(date),
                        ticket.price.between(minPrice, maxPrice),
                        ticket.waypointNum.eq(waypointNum)
                )
                .distinct();

        sortAndOrder(query, pageable);

        List<Tuple> ticketList = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Ticket> result = new ArrayList<>();
        for (Tuple tuple : ticketList) {
            result.add(tuple.get(ticket));
        }

        Long totalCount = queryFactory
                .select(ticket.countDistinct())
                .from(ticket)
                .leftJoin(ticket.flightList, flight)
                .leftJoin(ticket.tendency, tendency)
                .where(ticket.depCode.eq(departure),
                        ticket.arrCode.eq(destination),
                        ticket.depDate.eq(date),
                        ticket.price.between(minPrice, maxPrice),
                        ticket.waypointNum.eq(waypointNum)
                )
                .fetchOne();

        return new PageImpl<>(result, pageable, totalCount);
    }

    @Override
    public Page<Ticket> findWaypointIsGraterThanTickets(Pageable pageable, String departure, String destination, String date, int minPrice, int maxPrice, int waypointNum) {
        JPAQuery<Tuple> query  = queryFactory
                .select(ticket, ticket.tendency.chg)
                .from(ticket)
                .leftJoin(ticket.flightList, flight)
                .leftJoin(ticket.tendency, tendency)
                .where(ticket.depCode.eq(departure),
                        ticket.arrCode.eq(destination),
                        ticket.depDate.eq(date),
                        ticket.price.between(minPrice, maxPrice),
                        ticket.waypointNum.gt(waypointNum)
                )
                .distinct();

        sortAndOrder(query, pageable);

        List<Tuple> ticketList = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Ticket> result = new ArrayList<>();
        for (Tuple tuple : ticketList) {
            result.add(tuple.get(ticket));
        }

        Long totalCount = queryFactory
                .select(ticket.countDistinct())
                .from(ticket)
                .leftJoin(ticket.flightList, flight)
                .leftJoin(ticket.tendency, tendency)
                .where(ticket.depCode.eq(departure),
                        ticket.arrCode.eq(destination),
                        ticket.depDate.eq(date),
                        ticket.price.between(minPrice, maxPrice),
                        ticket.waypointNum.gt(waypointNum)
                )
                .fetchOne();

        return new PageImpl<>(result, pageable, totalCount);
    }

    private void sortAndOrder(JPAQuery<Tuple> query, Pageable pageable) {
        for (Sort.Order o : pageable.getSort()) {
            if(o.getProperty().equals("chg")) {
                PathBuilder pathBuilder = new PathBuilder(tendency.getType(), tendency.getMetadata());
                query.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                        pathBuilder.get(o.getProperty())), new OrderSpecifier(Order.ASC,
                        ticket.depTime), new OrderSpecifier(Order.ASC,
                        ticket.arrTime));
            } else {
                PathBuilder pathBuilder = new PathBuilder(ticket.getType(), ticket.getMetadata());
                query.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC : Order.DESC,
                        pathBuilder.get(o.getProperty())), new OrderSpecifier(Order.ASC,
                        ticket.depTime));
            }
        }
    }

}
