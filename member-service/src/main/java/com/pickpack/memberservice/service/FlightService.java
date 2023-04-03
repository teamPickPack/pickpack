package com.pickpack.memberservice.service;


import com.pickpack.memberservice.dto.flight.OnewayDto;
import com.pickpack.memberservice.dto.flight.OnewayWishPriceDto;
import com.pickpack.memberservice.dto.flight.RoundwayWishPriceDto;
import com.pickpack.memberservice.dto.flight.TwowayDto;
import com.pickpack.memberservice.entity.OnewayTicketLike;
import com.pickpack.memberservice.entity.RoundTicketLike;
import com.pickpack.memberservice.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FlightService {

    private final TicketRepository ticketRepository;

    /**
     * 티켓찜 조회
     */
    // 편도
//    @Cacheable(value = "OnewayDto", key = "#memberId")
    @Transactional(readOnly = true)
    public List<OnewayDto> findlikeTicket(Long memberId) {
        List<OnewayDto> onewayTicketLike = ticketRepository.findOnewayTicketLike(memberId);
        return onewayTicketLike;
    }
    // 왕복
//    @Cacheable(value = "TwowayDto", key = "#memberId")
    @Transactional(readOnly = true)
    public List<TwowayDto> findLikeRoundTicket(Long memberId){
        List<TwowayDto> twowayTicketLike = ticketRepository.findTwoWayTicketLike(memberId);

        //  총가격 계산
        for(TwowayDto t : twowayTicketLike){
            t.setTotalPrice(t.getGoWay().getPrice() + t.getReturnWay().getPrice());
        }
        System.out.println(twowayTicketLike);
        return twowayTicketLike;
    }

    /**
     * 원하는 가격 수정
     */
    // 편도
    @Transactional
    public void changeOnePrice(Long memberId, OnewayWishPriceDto onewayWishPriceDto){
        OnewayTicketLike onewayTicketLike =
                ticketRepository.CheckOnewayLike(memberId, onewayWishPriceDto.getOnewayTicketLikeId());
        onewayTicketLike.changeWishPrice(onewayWishPriceDto.getWishPrice());
    }
    // 왕복
    @Transactional
    public void changeRoundPrice(Long memberId, RoundwayWishPriceDto roundwayWishPriceDto){
        RoundTicketLike roundTicketLike =
                ticketRepository.CheckRoundwayLike(memberId, roundwayWishPriceDto.getRoundwayTicketLikeId());
        roundTicketLike.changeWishPrice(roundwayWishPriceDto.getWishPrice());
    }


    /**
     * 찜취소
     */
    // 편도
    @Transactional
    public void cancelOneLike(Long memberId, Long onewayTicketLikeId){
        OnewayTicketLike onewayTicketLike = ticketRepository.CheckOnewayLike(memberId, onewayTicketLikeId);
        onewayTicketLike.changeIsDelete();
    }
    // 왕복
    @Transactional
    public void cancelRoundLike(Long memberId, Long roundwayTicketLikeId){
        RoundTicketLike roundwayTicketLike = ticketRepository.CheckRoundwayLike(memberId, roundwayTicketLikeId);
        roundwayTicketLike.changeIsDelete();
    }

}
