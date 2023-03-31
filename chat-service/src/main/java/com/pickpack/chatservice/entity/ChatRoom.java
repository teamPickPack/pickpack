package com.pickpack.chatservice.entity;

import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Getter
@Table(name="chat_room")
public class ChatRoom implements Serializable {
//    private static final long serialVersionUID = -3377559815188666211L;

    @Column(name = "room_id")
    @Id
    private String roomId;

    @ManyToOne
    @JoinColumn(name="item_id")
    private Item item;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "seller_name",referencedColumnName ="nickname")
    private String seller;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "buyer_name",referencedColumnName ="nickname")
    private String buyer;
//    @Column
//    private String itemName;
//    private String imgUrl;
    private int messageSize;
    private String lastMessage;
    private boolean isNew;
    @Column(name = "recent_time")
    private Timestamp lastMessageTime;
}
