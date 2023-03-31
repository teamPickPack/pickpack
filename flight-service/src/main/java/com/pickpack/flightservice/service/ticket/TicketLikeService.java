package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketLikeReq;
import com.pickpack.flightservice.api.request.RoundTicketLikeReq;

public interface TicketLikeService {
    void likeOnewayTicket(OnewayTicketLikeReq onewayTicketLikeReq);
    void unlikeOnewayTicket(OnewayTicketLikeReq onewayTicketLikeReq);
    void likeRoundTicket(RoundTicketLikeReq roundTicketLikeReq);
    void unlikeRoundTicket(RoundTicketLikeReq roundTicketLikeReq);
}
