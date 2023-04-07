package com.pickpack.flightservice.dto.flight;

import lombok.Getter;

@Getter
public class PageableDto {
    private String sortType;
    private String orderBy;
    private int page;
}
