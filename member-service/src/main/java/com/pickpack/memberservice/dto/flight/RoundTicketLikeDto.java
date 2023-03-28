package com.pickpack.memberservice.dto.flight;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoundTicketLikeDto {

    private Boolean isLike;
    private Integer wantedPrice;
    private Long ticket_go;
    private GowayDto goWay;
    private Long ticket_come;
    private ReturnWayDto returnWay;

}
