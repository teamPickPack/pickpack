package com.pickpack.flightservice.dto.flight;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class OneWayInfoDto {
    private String departure;
    private String destination;
    private String date;
}
