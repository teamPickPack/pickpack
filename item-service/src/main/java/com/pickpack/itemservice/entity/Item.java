package com.pickpack.itemservice.entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Item {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Enumerated(EnumType.STRING)
    private Category category;
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
    private List<ItemLike> itemLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Chatroom> chatroomList = new ArrayList<>();

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Soldout soldout;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;


//    ====== 연관관계 메서드 ======
    public void addItemLikeList(ItemLike itemLike){
        itemLikeList.add(itemLike);
    }

    public void addChatroomList(Chatroom chatroom){
        chatroomList.add(chatroom);
        chatroom.setItem(this);
    }

//    ====== 생성 메서드 ======
    private Item(String title, Category category, Integer price, String content, String itemName){
        this.title = title;
        this.category = category;
        this.price = price;
        this.content = content;
        this.itemName = itemName;
        LocalDateTime nowDT = LocalDateTime.now();
        this.registDate = nowDT.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.isComplete = false;
        this.isDelete = false;
    }
    public static Item createItem(String title, Category category, Integer price, String content, String itemName, City city, Member member){
        Item item = new Item(title, category, price, content, itemName);
        item.city = city;
        item.member = member;
        return item;
    }

    public void modifyItem(String title, Category category, Integer price, String content, String itemName, City city, Member member){
        this.title = title;
        this.category = category;
        this.price = price;
        this.content = content;
        this.itemName = itemName;
        this.city = city;
        this.member = member;
    }

    public void setImage(String imgUrl){
        this.imgUrl = imgUrl;
    }
    public void complete(Soldout soldout){
        this.isComplete = true;
        soldout.setItem(this);
    }
}


