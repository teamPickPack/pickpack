package com.pickpack.itemservice.entity;

import com.pickpack.itemservice.service.itemLike.ItemLikeService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Member {

    @Column(name = "member_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mid;
    private String password;
    private String nickname;

    @OneToMany(mappedBy = "member")
    private List<MemberChatroom> memberChatroomList;

    @OneToMany(mappedBy = "member")
    private List<Item> itemList;

    @OneToMany(mappedBy = "member")
    private List<ItemLike> itemLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Soldout> soldoutList;

//    ====== 연관관계 메서드 ======
    public void addItemLike(ItemLike itemLike){
        itemLikeList.add(itemLike);
    }

    public void removeItemLike(ItemLike itemLike){
        itemLikeList.remove(itemLike);
    }

}

