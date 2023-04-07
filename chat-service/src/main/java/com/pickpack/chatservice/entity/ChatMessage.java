package com.pickpack.chatservice.entity;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="chat_message")
public class ChatMessage implements Serializable {
//    private static final long serialVersionUID = -3377559815188666211L;


    @Column(name = "chat_id")
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    @Enumerated(EnumType.STRING)
    private RedisChatMessage.MessageType type;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "sender_name", referencedColumnName = "nickname")
    private String sender;

    @Column
    private String message;
    //TODO RedisChatMessage time과 통일과정 필요<-timestamp? localdatetime?
    private Timestamp time;


}
