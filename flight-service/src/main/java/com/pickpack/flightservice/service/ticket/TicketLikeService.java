package com.pickpack.flightservice.service.ticket;

import com.pickpack.flightservice.api.request.OnewayTicketLikeReq;

public interface TicketLikeService {
    void likeOnewayTicket(OnewayTicketLikeReq onewayTicketLikeReq);
    void unLikeOneWayTicket(OnewayTicketLikeReq onewayTicketLikeReq);
}
