package com.pickpack.chatservice.entity;

import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

// TODO chatroom에 대한 id 수정(room_id+아이디)<-왜 그랬더라?
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

    //TODO Member에 serializable 걸건지 연관관계를 끊을건지 결정
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
