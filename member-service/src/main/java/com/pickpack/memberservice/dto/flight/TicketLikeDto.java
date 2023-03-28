package com.pickpack.memberservice.dto.flight;

import com.pickpack.memberservice.entity.Flight;
import com.pickpack.memberservice.entity.Ticket;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class TicketLikeDto {
    private Boolean isLike;
    private Integer wantedPrice;
    private Long ticketId;
    private TicketInfoDto ticket;
    private List<Flight> flightList;

}
