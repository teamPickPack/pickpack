package com.pickpack.memberservice.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class OnewayTicketLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oneway_ticket_like_id")
    private Long id;
    private Boolean isDelete;
    private Boolean isChange;

    private Integer wantedPrice;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    public void changeIsDelete(){
        this.isDelete = !isDelete;
    }

    public void changeWishPrice(Integer price){
        this.wantedPrice = price;
    }

}
