package com.pickpack.chatservice.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
public class Item {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
//    @Enumerated(EnumType.STRING)
//    private Category category;
    private Integer price;
    private String content;
    private String imgUrl;
    private String registDate;
    private boolean isComplete;
    private boolean isDelete;

    private String itemName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<ChatRoom> chatroomList = new ArrayList<>();

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
    private Soldout soldout;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "city_id")
//    private City city;
}

