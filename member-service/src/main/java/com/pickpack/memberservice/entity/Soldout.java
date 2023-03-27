package com.pickpack.memberservice.entity;

import javax.persistence.*;

@Entity
public class Soldout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soldout_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
}
