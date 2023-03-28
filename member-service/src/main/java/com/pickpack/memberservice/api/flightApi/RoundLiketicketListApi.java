package com.pickpack.memberservice.api.flightApi;

import com.pickpack.memberservice.dto.flight.RoundTicketLikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class RoundLiketicketListApi {

    private List<RoundTicketLikeDto> RoundLiketicketList;

}
