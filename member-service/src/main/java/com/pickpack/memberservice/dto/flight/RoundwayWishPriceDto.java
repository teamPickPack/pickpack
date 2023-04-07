package com.pickpack.memberservice.dto.flight;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoundwayWishPriceDto {

    private Long roundwayTicketLikeId;

    private Integer wishPrice;
}
