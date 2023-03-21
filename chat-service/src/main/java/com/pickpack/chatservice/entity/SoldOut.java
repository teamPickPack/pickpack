package com.pickpack.chatservice.entity;

import javax.persistence.*;
import java.lang.module.FindException;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SoldOut {

    @Id
    @Column(name = "soldout_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch=FetchType.LAZY)
    @Column(name="item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name="member_id")
    private Member member;


}

