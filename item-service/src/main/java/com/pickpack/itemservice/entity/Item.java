package com.pickpack.itemservice.entity;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
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

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
    private Soldout soldout;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;


//    ====== 연관관계 메서드 ======
    public void addItemLikeList(ItemLike itemLike){
        itemLikeList.add(itemLike);
        itemLike.setItem(this);
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
        this.registDate = LocalDateTime.now().toString();
        this.isComplete = false;
        this.isDelete = false;
    }
    public static Item createItem(String title, Category category, Integer price, String content, String itemName){
        Item item = new Item(title, category, price, content, itemName);
        return item;
    }
    private void setImage(String imgUrl){
        this.imgUrl = imgUrl;
    }
}


