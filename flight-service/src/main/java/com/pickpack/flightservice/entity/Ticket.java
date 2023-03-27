package com.pickpack.flightservice.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
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
    private String waypoints = wayPointToString();

    @OneToMany
    @JoinColumn(name = "ticketId", insertable=false, updatable=false)
    private List<Flight> flightList;

    private String wayPointToString() {
        String str = "";

        if(flightList != null) {
            for(int i = 0; i < flightList.size(); i++) {
                Flight flight = flightList.get(i);
                str += flight.getDepName() + "(" + flight.getDepCode() + ")";

                if(i != flightList.size() - 1) str += "/";
            }
            return str;
        } else {
            return "";
        }
    }
}
