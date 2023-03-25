package com.pickpack.flightservice.dto.flight;

import com.pickpack.flightservice.entity.Flight;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class TicketDto {
    private long ticketId;
    private int waypointNum;
    private int price;
    private String registDate;
    private String totalTime;
    private int totalTimeNum;
    private String airline;
    private boolean codeshare;
    private String depTime;
    private String arrTime;
    private int plusDate;
    private String depName;
    private String depCode;
    private String arrName;
    private String arrCode;
    private String waypoints = wayPointToString();

    private List<Flight> flightList;

    private String wayPointToString() {
        String str = "";
        
        for(int i = 0; i < flightList.size(); i++) {
            Flight flight = flightList.get(i);
            str += flight.getDepName() + "(" + flight.getDepCode() + ")";

            if(i != flightList.size() - 1) str += "/";
        }
        return str;
    }
}
