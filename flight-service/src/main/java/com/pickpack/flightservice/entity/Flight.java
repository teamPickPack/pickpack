package com.pickpack.flightservice.entity;

import javax.persistence.*;

@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketId")
    private String id;
    private String ticketId;
    private String departure;
    private String destination;
    private String waitTime;
    private String depTime;
    private String depDate;
    private String arrTime;
    private String arrDate;
    private String flightTime;
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticketId")
    private Ticket ticket;
}
