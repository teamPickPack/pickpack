package com.ssafy.place.entity;

import lombok.Getter;

@Getter
public class Location {
    private Float lat;
    private Float lng;

    public Location(Float lat, Float lng) {
        this.lat = lat;
        this.lng = lng;
    }
}

