package com.pickpack.chatservice.entity;

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
    private List<Soldout> soldOutList;
    @OneToMany(mappedBy = "member")
    private List<MemberChatroom> memberChatroomList;

}

