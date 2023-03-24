package com.pickpack.flightservice.entity;

import javax.persistence.*;

@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private Long id;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
