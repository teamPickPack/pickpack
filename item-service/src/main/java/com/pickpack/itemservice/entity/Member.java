package com.pickpack.itemservice.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Column(name = "member_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mid;
    private String pwd;
    private String nickname;

    @OneToMany(mappedBy = "member")
    private List<MemberChatroom> memberChatroomList;

    @OneToMany(mappedBy = "member")
    private List<Item> itemList;

    @OneToMany(mappedBy = "member")
    private List<ItemLike> itemLikeList;

    @OneToMany(mappedBy = "member")
    private List<Soldout> soldoutList;

}

