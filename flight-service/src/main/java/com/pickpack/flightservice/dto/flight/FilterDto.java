package com.pickpack.flightservice.dto.flight;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FilterDto {
    private boolean[] direct = new boolean[4]; // [0] : 전체, [1] : 직항, [2] : 경유 1회, [3] : 경유 2회 이상
    private int minPrice;
    private int maxPrice;
}
