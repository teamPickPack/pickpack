package com.pickpack.flightservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class OnewayTicketLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oneway_ticket_like_id")
    private Long id;
    private Boolean isDelete;
    private Integer wantedPrice;
    private Long ticketId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public OnewayTicketLike(Boolean isDelete, Integer wantedPrice, Long ticketId, Member member) {
        this.isDelete = isDelete;
        this.wantedPrice = wantedPrice;
        this.ticketId = ticketId;
        this.member = member;
    }

    public OnewayTicketLike(Long id, Boolean isDelete, Integer wantedPrice, Long ticketId, Member member) {
        this.id = id;
        this.isDelete = isDelete;
        this.wantedPrice = wantedPrice;
        this.ticketId = ticketId;
        this.member = member;
    }
}

