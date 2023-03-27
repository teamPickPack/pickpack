package com.pickpack.chatservice.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
public class Member {

    @Column(name = "member_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mid;
    private String pwd;
    private String nickname;
    private String img_url;

    //TODO db에 안겹치고..아니면 그냥 redishash로 전부 바꾸는게 이쁜가
//    @OneToMany(mappedBy = "member")
//    private List<MemberChatroom> memberChatroomList;

    @OneToMany(mappedBy = "member")
    private List<Item> itemList;

    @OneToMany(mappedBy = "member")
    private List<Soldout> soldoutList;

//    @Builder
//    public Member(Long id, String mid, String pwd, String nickname, String img_url, List<OnewayTicketLike> onewayTicketLikeList, List<RoundTicketLike> roundTicketLikeList, List<MemberChatroom> memberChatroomList, List<Item> itemList, List<ItemLike> itemLikeList, List<Soldout> soldoutList) {
//        this.id = id;
//        this.mid = mid;
//        this.pwd = pwd;
//        this.nickname = nickname;
//        this.img_url = img_url;
//        this.onewayTicketLikeList = onewayTicketLikeList;
//        this.roundTicketLikeList = roundTicketLikeList;
//        this.memberChatroomList = memberChatroomList;
//        this.itemList = itemList;
//        this.itemLikeList = itemLikeList;
//        this.soldoutList = soldoutList;
//    }
}

