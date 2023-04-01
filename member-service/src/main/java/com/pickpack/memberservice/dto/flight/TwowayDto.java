package com.pickpack.memberservice.dto.flight;


import com.pickpack.memberservice.entity.Ticket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Transient;

@Data
@NoArgsConstructor
public class TwowayDto {

    private Boolean isLike;

    private Integer wantedPrice;

    private Ticket goWay;

    private Ticket returnWay;

    private Integer totalPrice;

}
