package com.pickpack.flightservice.dto.flight;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FilterDto {
    private String direct;
    private int minPrice;
    private int maxPrice;
}
