package com.pickpack.flightservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OnewayTicketLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oneway_ticket_like_id")
    private Long id;
    private Boolean isDelete;
    private Integer wantedPrice;
    private Long ticketId;
    private Boolean isChange;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}

