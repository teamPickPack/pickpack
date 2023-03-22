package com.pickpack.chatservice.entity;

import javax.persistence.*;

@Entity
public class Soldout {

    @Id
    @Column(name = "soldout_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;


}

