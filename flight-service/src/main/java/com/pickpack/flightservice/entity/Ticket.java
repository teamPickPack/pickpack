package com.pickpack.flightservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long id;
    private int price;
    private int waypointNum;
    private String registDate;
    private String totalTime;
    private boolean codeshare;
    private String airline;
    private String depTime;
    private String depDate;
    private String depName;
    private String depCode;
    private String arrTime;
    private String arrDate;
    private String arrName;
    private String arrCode;
    private int plusDate;
    private int totalTimeNum;

    @Transient
    private String waypoints;

    @OneToMany
    @JoinColumn(name = "ticketId", insertable=false, updatable=false)
    private List<Flight> flightList;

    @OneToOne(mappedBy = "ticket")
    @JsonIgnore
    private Tendency tendency;
}
