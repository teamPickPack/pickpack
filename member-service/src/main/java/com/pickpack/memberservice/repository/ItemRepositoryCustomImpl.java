package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.dto.item.ItemDto;
import com.pickpack.memberservice.entity.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;

import java.util.List;

import static com.pickpack.memberservice.entity.QCity.city;
import static com.pickpack.memberservice.entity.QItem.item;
import static com.pickpack.memberservice.entity.QItemLike.itemLike;
import static com.pickpack.memberservice.entity.QMember.member;
import static com.pickpack.memberservice.entity.QSoldout.soldout;

public class ItemRepositoryCustomImpl implements ItemRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ItemRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<ItemDto> findItemList(Long memberId, String cat){

        List<ItemDto> buySellItemList = queryFactory
                .select(Projections.fields(ItemDto.class,
                        item.id.as("itemId"),
                        member.id.as("memberId"),
                        item.title,
                        item.category,
                        item.price,
                        item.content,
                        item.imgUrl.as("img_url"),
                        item.registDate,
                        soldout.member.id.as("buyer"),
                        item.isComplete,
                        item.itemName,
                        city.id.as("cityId"),
                        city.cityName)
                ).from(item)
                .join(item.member, member).on(member.id.eq(memberId))
                .join(item.city, city)
                .leftJoin(item.soldout, soldout)
                .where(item.category.eq(Category.valueOf(cat)))
                .where(item.isDelete.eq(Boolean.FALSE))
                .fetch();

        return buySellItemList;
    }


    public List<ItemDto> findLikeItemList(Long memberId, String cat){
        List<ItemDto> borrowRentItemList = queryFactory
                .select(Projections.fields(ItemDto.class,
                        item.id.as("itemId"),
                        member.id.as("memberId"),
                        item.title,
                        item.category,
                        item.price,
                        item.content,
                        item.imgUrl.as("img_url"),
                        item.registDate,
                        soldout.member.id.as("buyer"),
                        item.isComplete,
                        item.itemName,
                        city.id.as("cityId"),
                        city.cityName)
                ).from(item)
                .join(item.member, member).on(member.id.eq(memberId))
                .join(item.itemLikeList, itemLike).on(itemLike.isDelete.eq(Boolean.FALSE))
                .join(item.city, city)
                .leftJoin(item.soldout, soldout)
                .where(item.category.eq(Category.valueOf(cat)))
                .where(item.isDelete.eq(Boolean.FALSE))
                .fetch();

        return borrowRentItemList;
    }


}
