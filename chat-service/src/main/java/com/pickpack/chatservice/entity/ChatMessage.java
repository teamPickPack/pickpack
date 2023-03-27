package com.pickpack.chatservice.entity;

import com.pickpack.chatservice.entity.redis.RedisChatMessage;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id")
    private String roomId;

    @Enumerated(EnumType.STRING)
    private RedisChatMessage.MessageType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_name", referencedColumnName = "nickname")
    private Member sender;

    @Column
    private String message;

    //TODO 겹칠수가 있을까..?
    @Column(unique = true)
    private String time;


}
