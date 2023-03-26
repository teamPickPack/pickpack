package com.pickpack.flightservice.dto.flight;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OneWayInfoDto {
    private String departure;
    private String destination;
    private String date;
}
