package com.pickpack.flightservice.dto.flight;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class FilterDto {
    private String direct;
    private int minPrice;
    private int maxPrice;
}
