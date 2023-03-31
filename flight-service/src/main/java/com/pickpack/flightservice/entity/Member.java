package com.pickpack.flightservice.entity;

import lombok.Getter;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Member {
    @Column(name = "member_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "member")
    private List<OnewayTicketLike> onewayTicketLikeList;

    @OneToMany(mappedBy = "member")
    private List<RoundTicketLike> roundTicketLikeList;
}
