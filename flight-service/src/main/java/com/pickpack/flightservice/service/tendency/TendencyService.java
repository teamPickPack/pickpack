package com.pickpack.flightservice.service.tendency;

import com.pickpack.flightservice.api.response.TendencyRes;
import com.pickpack.flightservice.entity.Tendency;
import com.pickpack.flightservice.repository.tendency.TendencyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TendencyService {
    private final TendencyRepository tendencyRepository;

    public TendencyRes getTendency(Long ticketId){
        Tendency tendency = tendencyRepository.findByTicketId(ticketId);
        return new TendencyRes(tendency.getAverage(), tendency.getChg(), tendency.getUpdown(), tendency.getPastPrices());
    }
}
