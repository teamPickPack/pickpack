package com.pickpack.itemservice.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class City {
    @Id
    @Column(name = "city_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cityName;

    private Float lat;
    private Float lng;

}
