package com.pickpack.flightservice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RoundTicketLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "round_ticket_like_id")
    private Long id;

    private Boolean isDelete;
    private Integer wantedPrice;
    private Boolean isChange;
    @Column(name = "ticket_to_ticket_id")
    private Long ticketToId;
    @Column(name = "ticket_from_ticket_id")
    private Long ticketFromId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void changeDelete(){
        this.isDelete = !this.isDelete;
    }
}

