package com.pickpack.flightservice.api.response;

import com.pickpack.flightservice.entity.Ticket;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RoundTicketRes {
    private boolean isLike;
    private Ticket goWay;
    private Ticket returnWay;
    private int totalPrice;

    @Builder
    public RoundTicketRes(boolean isLike, Ticket goWay, Ticket returnWay, int totalPrice) {
        this.isLike = isLike;
        this.goWay = goWay;
        this.returnWay = returnWay;
        this.totalPrice = totalPrice;
    }
}
