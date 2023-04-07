package com.pickpack.memberservice.dto.flight;


import com.pickpack.memberservice.entity.Ticket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OnewayDto implements Serializable {

    private Long onewayId;

    private Boolean isLike;

    private Integer wantedPrice;

    private Ticket ticket;

}
