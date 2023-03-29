package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.Category;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pickpack.itemservice.entity.QCity.city;
import static com.pickpack.itemservice.entity.QItem.item;
import static com.pickpack.itemservice.entity.QMember.member;

public class ItemRepositoryCustomImpl implements ItemRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public ItemRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }
    public List<ItemListDto> getItemsWithCategory(String categoryStr) {
        List<ItemListDto> itemsWithCategory =
                queryFactory.select(Projections.fields(ItemListDto.class,
                        item.id.as("itemId"),
                        member.id.as("memberId"),
                        item.title,
                        item.category,
                        item.price,
                        item.itemName,
                        item.imgUrl,
                        item.registDate,
                        item.isComplete,
                        city.id.as("cityId"),
                        city.cityName)).from(item)
                        .join(item.member, member)
                        .join(item.city, city)
                        .where(item.category.eq(Category.valueOf(categoryStr)))
                        .where(item.isDelete.eq(Boolean.FALSE))
                        .orderBy(item.registDate.desc(),item.price.asc())
                        .fetch();
        return itemsWithCategory;
    }
}
