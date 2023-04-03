package com.pickpack.memberservice.entity;


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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mid;
    @Column(nullable = false, length = 20)
    private String pwd;
    private String nickname;
    private String img_url;

    @OneToMany(mappedBy = "member")
    private List<OnewayTicketLike> onewayTicketLikeList;

    @OneToMany(mappedBy = "member")
    private List<RoundTicketLike> roundTicketLikeList;

    @OneToMany(mappedBy = "member")
    private List<MemberChatroom> memberChatroomList;

    @OneToMany(mappedBy = "member")
    private List<Item> itemList;

    @OneToMany(mappedBy = "member")
    private List<ItemLike> itemLikeList;

    @OneToMany(mappedBy = "member")
    private List<Soldout> soldoutList;


}
