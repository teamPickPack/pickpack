package com.pickpack.memberservice.dto.flight;


import com.pickpack.memberservice.entity.Flight;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GowayDto {
    private TicketInfoDto ticket;
    private List<Flight> flightList;

}
