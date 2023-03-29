package com.pickpack.chatservice.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Chatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private Long id;

    @OneToMany(mappedBy = "chatroom")
    private List<MemberChatroom> memberChatroomList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
}

