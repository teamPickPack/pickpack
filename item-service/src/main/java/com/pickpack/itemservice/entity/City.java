package com.pickpack.itemservice.entity;

import javax.persistence.*;

@Entity
public class City {
    @Id
    @Column(name = "city_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Transient
    private Float lat;
    @Transient
    private Float lng;
}
