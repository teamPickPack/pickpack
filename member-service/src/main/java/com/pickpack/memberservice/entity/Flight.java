package com.pickpack.memberservice.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Column(name = "flight_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;


}
