package com.pickpack.flightservice.dto.flight;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RoundInfoDto {
    private String departure;
    private String destination;
    private String depDate;
    private String arrDate;
}
