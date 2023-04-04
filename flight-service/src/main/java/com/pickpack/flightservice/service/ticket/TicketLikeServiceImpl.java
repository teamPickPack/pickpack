package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketLikeReq;
import com.pickpack.flightservice.api.request.RoundTicketLikeReq;
import com.pickpack.flightservice.entity.Member;
import com.pickpack.flightservice.entity.OnewayTicketLike;
import com.pickpack.flightservice.entity.RoundTicketLike;
import com.pickpack.flightservice.repository.MemberRepository;
import com.pickpack.flightservice.repository.ticket.OnewayTicketLikeRepository;
import com.pickpack.flightservice.repository.ticket.RoundTicketLikeRepository;
import com.pickpack.flightservice.repository.ticket.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TicketLikeServiceImpl implements TicketLikeService {
    @Autowired
    OnewayTicketLikeRepository onewayTicketLikeRepository;

    @Autowired
    RoundTicketLikeRepository roundTicketLikeRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    MemberRepository memberRepository;

    @Override
    public void likeOnewayTicket(OnewayTicketLikeReq onewayTicketLikeReq) {
        Member member = memberRepository.getById(onewayTicketLikeReq.getMemberId());
        OnewayTicketLike onewayTicketLike = onewayTicketLikeRepository.findByTicketIdAndMember(onewayTicketLikeReq.getTicketId(), member);
        if(onewayTicketLike == null){
            onewayTicketLike = OnewayTicketLike.builder()
                    .isDelete(false)
                    .isChange(false)
                    .ticketId(onewayTicketLikeReq.getTicketId())
                    .wantedPrice(0)
                    .member(member)
                    .build();
        }else{
            onewayTicketLike.changeDelete();
        }

        onewayTicketLikeRepository.save(onewayTicketLike);
    }

    @Override
    public void unlikeOnewayTicket(OnewayTicketLikeReq onewayTicketLikeReq) {
        Member member = memberRepository.getById(onewayTicketLikeReq.getMemberId());
        OnewayTicketLike onewayTicketLike = onewayTicketLikeRepository.findByTicketIdAndMember(onewayTicketLikeReq.getTicketId(), member);

//        onewayTicketLike = OnewayTicketLike.builder()
//                .id(onewayTicketLike.getId())
//                .isDelete(true)
//                .isChange(false)
//                .ticketId(onewayTicketLikeReq.getTicketId())
//                .wantedPrice(onewayTicketLike.getWantedPrice())
//                .member(member)
//                .build();
        onewayTicketLike.changeDelete();

        onewayTicketLikeRepository.save(onewayTicketLike);
    }

    @Override
    public void likeRoundTicket(RoundTicketLikeReq roundTicketLikeReq) {
        Member member = memberRepository.getById(roundTicketLikeReq.getMemberId());
        RoundTicketLike roundTicketLike = roundTicketLikeRepository.findByTicketToIdAndTicketFromIdAndMember(roundTicketLikeReq.getTicketToId(), roundTicketLikeReq.getTicketFromId(), member);
        if(roundTicketLike == null) {
            roundTicketLike = RoundTicketLike.builder()
                    .isDelete(false)
                    .isChange(false)
                    .ticketToId(roundTicketLikeReq.getTicketToId())
                    .ticketFromId(roundTicketLikeReq.getTicketFromId())
                    .wantedPrice(0)
                    .member(member)
                    .build();
        }else{
            roundTicketLike.changeDelete();
        }
        roundTicketLikeRepository.save(roundTicketLike);
    }

    @Override
    public void unlikeRoundTicket(RoundTicketLikeReq roundTicketLikeReq) {
        Member member = memberRepository.getById(roundTicketLikeReq.getMemberId());
        RoundTicketLike roundTicketLike = roundTicketLikeRepository.findByTicketToIdAndTicketFromIdAndMember(roundTicketLikeReq.getTicketToId(), roundTicketLikeReq.getTicketFromId(), member);

//        roundTicketLike = RoundTicketLike.builder()
//                .id(roundTicketLike.getId())
//                .isDelete(true)
//                .isChange(false)
//                .ticketToId(roundTicketLikeReq.getTicketToId())
//                .ticketFromId(roundTicketLikeReq.getTicketFromId())
//                .wantedPrice(roundTicketLike.getWantedPrice())
//                .member(member)
//                .build();
        roundTicketLike.changeDelete();

        roundTicketLikeRepository.save(roundTicketLike);
    }
}
