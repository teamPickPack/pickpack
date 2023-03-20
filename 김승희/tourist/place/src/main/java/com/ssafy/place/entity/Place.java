package com.ssafy.place.entity;

import lombok.Getter;

import java.util.ArrayList;
@Getter
public class Place {
    String business_status;
    Geometry geometry;
    String icon;
    String icon_background_color;
    String icon_mask_base_uri;
    String name;
    Object opening_hours;
    ArrayList<Object> photos;
    String place_id;
    Object plus_code;
    String price_level;
    String rating;
    String reference;
    String scope;
    Object types;
    String user_ratings_total;
    String vicinity;

    public Place(String business_status, Geometry geometry, String icon, String icon_background_color, String icon_mask_base_uri, String name, Object opening_hours, ArrayList<Object> photos, String place_id, Object plus_code, String price_level, String rating, String reference, String scope, Object types, String user_ratings_total, String vicinity) {
        this.business_status = business_status;
        this.geometry = geometry;
        this.icon = icon;
        this.icon_background_color = icon_background_color;
        this.icon_mask_base_uri = icon_mask_base_uri;
        this.name = name;
        this.opening_hours = opening_hours;
        this.photos = photos;
        this.place_id = place_id;
        this.plus_code = plus_code;
        this.price_level = price_level;
        this.rating = rating;
        this.reference = reference;
        this.scope = scope;
        this.types = types;
        this.user_ratings_total = user_ratings_total;
        this.vicinity = vicinity;
    }
}

