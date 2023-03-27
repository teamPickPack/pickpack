package com.pickpack.chatservice.entity;

import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;

//TODO chatroom에 대한 id 수정(room_id+아이디)
@Entity
@Getter
@Table(name="chat_room")
public class ChatRoom implements Serializable {
//    private static final long serialVersionUID = -3377559815188666211L;

    @Column(name = "room_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String roomId;

    @ManyToOne
    @JoinColumn(name="item_id")
    private Item item;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_name",referencedColumnName ="nickname")
    private Member seller;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_name",referencedColumnName ="nickname")
    private Member buyer;
//    @Column
//    private String itemName;
//    private String imgUrl;
    private Long messageSize;
    private String lastMessage;
    private boolean isNew;
}
