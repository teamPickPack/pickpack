package com.pickpack.itemservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
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


//    ========== 생성 메서드 ===========
    public static Soldout createSoldout(Item item, Member member){
        Soldout soldout = new Soldout();

        soldout.item = item;
        soldout.member = member;

        return soldout;
    }
}
