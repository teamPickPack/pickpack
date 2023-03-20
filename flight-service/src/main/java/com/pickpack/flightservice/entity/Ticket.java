package com.pickpack.flightservice.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketId")
    private String id;
    private int price;
    private int waypointNum;
    private String registTime;
    private String totalTime;
    private boolean codeShare;
    private String airline;
    private String depTime;
    private String depDate;
    private String arrTime;
    private String arrDate;
    private int plusDate;

    @OneToMany(mappedBy = "ticket")
    private List<Flight> flightList;
}
