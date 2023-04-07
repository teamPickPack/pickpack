package com.pickpack.itemservice.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Chatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private Long id;
    private boolean isDelete;
    @OneToMany(mappedBy = "chatroom")
    private List<MemberChatroom> memberChatroomList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
//  ====== 연관관계 메서드 ======
    public void setItem(Item item) {
        this.item = item;
    }
}

