package com.pickpack.memberservice.dto.flight;


import com.pickpack.memberservice.entity.Ticket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OnewayDto {

    private Boolean isLike;

    private Integer wantedPrice;

    private Ticket ticket;

}
