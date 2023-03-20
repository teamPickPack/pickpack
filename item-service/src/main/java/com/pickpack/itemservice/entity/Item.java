package com.pickpack.itemservice.entity;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Item {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Enumerated(EnumType.STRING)
    private Category category;
    private int price;
    private String content;
    private String imgUrl;
    private String registDate;
    private boolean isComplete;
    private boolean isDelete;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<ItemLike> itemLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Chatroom> chatroomList = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Soldout> soldoutList;

    @OneToOne
    @JoinColumn(name = "city_id")
    private City city;
}


