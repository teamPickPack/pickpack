package com.pickpack.memberservice.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long id;

    private Integer price;
    private Integer waypointNum;
    private String registTime;
    private String totalTime;
    private boolean codeShare;
    private String airline;
    private String depTime;
    private String depDate;
    private String arrTime;
    private String arrDate;
    private Integer plusDate;

    private Integer totalTimeNum;

    @OneToMany(mappedBy = "ticket")
    private List<RoundTicketLike> roundTicketLikeList;
    @OneToMany(mappedBy = "ticket")
    private List<OnewayTicketLike> onewayTicketLikeList;
    @OneToMany(mappedBy = "ticket")
    private List<Flight> flightList;

}
