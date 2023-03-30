package com.pickpack.itemservice.entity;

import com.pickpack.itemservice.repository.itemLike.ItemLikeRepository;
import com.pickpack.itemservice.service.itemLike.ItemLikeService;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ItemLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_like_id")
    private Long id;

    private boolean isDelete;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

//   ====== 연관관계 메서드 ======
    public void setItem(Item item) {
        this.item = item;
    }

    public void setDelete(Boolean bool){
        this.isDelete = bool;
    }
//    ====== 생성 메서드 ======
    public static ItemLike createItemLike(Item item, Member member){
        ItemLike itemLike = new ItemLike();
        itemLike.item = item;
        item.addItemLikeList(itemLike);
        member.addItemLike(itemLike);
        itemLike.member = member;
        itemLike.isDelete = false;
        return itemLike;
    }

    public void unlike(){
        this.getMember().removeItemLike(this);
    }

    @Override
    public boolean equals(Object obj) {
        if(obj == null){
            return false;
        }
        if(obj == this){
            return true;
        }
        if(this.getClass() != obj.getClass()){
            return false;
        }
        ItemLike oth = (ItemLike)  obj;
        if(oth.getId() == this.getId()){
            return true;
        }
        return false;
    }
}


