package com.pickpack.memberservice.entity;

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
    @Transient
    private Float lat;
    @Transient
    private Float lng;
    @OneToOne(mappedBy = "city")
    private Item item;
}
