package com.ssafy.place.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
public class City {
    private String name;
    private Float lat;
    private Float lng;

    public City(String name, Float lat, Float lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}
