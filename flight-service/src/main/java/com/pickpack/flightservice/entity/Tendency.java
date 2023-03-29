package com.pickpack.flightservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Tendency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tendency_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    private String pastPrices;
    private Double average;
    private Double chg;
    private Integer updown;
}
