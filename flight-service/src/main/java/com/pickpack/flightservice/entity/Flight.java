package com.pickpack.flightservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private Long id;
    private Long ticketId;
    private String departure;
    private String destination;
    private String waitTime;
    private String depTime;
    private String depDate;
    private String depName;
    private String depCode;
    private String arrTime;
    private String arrDate;
    private String arrName;
    private String arrCode;
    private String flightTime;
    private String code;
    private String waypointName;
    private int plusDate;
}
