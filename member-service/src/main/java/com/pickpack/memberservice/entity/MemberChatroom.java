package com.pickpack.memberservice.entity;

import javax.persistence.*;

@Entity
public class MemberChatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Chatroom chatroom;
}
