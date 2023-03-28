package com.pickpack.flightservice.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TendencyRes {
    private Double average;
    private Double chg;
    private Integer updown;
    private String info;
}
