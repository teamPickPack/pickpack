package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketLikeReq;
import com.pickpack.flightservice.entity.Member;
import com.pickpack.flightservice.entity.OnewayTicketLike;
import com.pickpack.flightservice.entity.Ticket;
import com.pickpack.flightservice.repository.MemberRepository;
import com.pickpack.flightservice.repository.ticket.OnewayTicketRepository;
import com.pickpack.flightservice.repository.ticket.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TicketLikeServiceImpl implements TicketLikeService {
    @Autowired
    OnewayTicketRepository onewayTicketRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    MemberRepository memberRepository;

    @Override
    public void likeOnewayTicket(OnewayTicketLikeReq onewayTicketLikeReq) {
        Member member = memberRepository.getById(onewayTicketLikeReq.getMemberId());
        OnewayTicketLike onewayTicketLike = OnewayTicketLike.builder()
                .isDelete(false)
                .ticketId(onewayTicketLikeReq.getTicketId())
                .wantedPrice(0)
                .member(member)
                .build();

        onewayTicketRepository.save(onewayTicketLike);
    }

    @Override
    public void unLikeOneWayTicket(OnewayTicketLikeReq onewayTicketLikeReq) {
        Member member = memberRepository.getById(onewayTicketLikeReq.getMemberId());
        OnewayTicketLike onewayTicketLike = onewayTicketRepository.findByTicketIdAndMember(onewayTicketLikeReq.getTicketId(), member);

        onewayTicketLike = OnewayTicketLike.builder()
                .id(onewayTicketLike.getId())
                .isDelete(true)
                .ticketId(onewayTicketLikeReq.getTicketId())
                .wantedPrice(onewayTicketLike.getWantedPrice())
                .member(member)
                .build();

        onewayTicketRepository.save(onewayTicketLike);
    }
}
