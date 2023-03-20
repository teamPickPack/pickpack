package com.ssafy.place.entity;

import lombok.Getter;

import java.util.ArrayList;
@Getter
public class Geometry {
    private Location location;
    private Object viewport;

    public Geometry(Location location, Object viewport) {
        this.location = location;
        this.viewport = viewport;
    }
}

