package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.dto.item.ItemDetailDto;
import com.pickpack.itemservice.dto.item.ItemListDto;
import com.pickpack.itemservice.entity.Category;
import com.pickpack.itemservice.entity.Item;
import com.pickpack.itemservice.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;

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
    public List<ItemListDto> getItemsWithCategory(Pageable pageable, String categoryStr) {
        List<ItemListDto> itemsWithCategory =
                queryFactory.select(Projections.fields(ItemListDto.class,
                        item.id.as("itemId"),
                        member.id.as("memberId"),
                        item.title, item.category, item.price, item.itemName,
                        item.imgUrl, item.registDate, item.isComplete,
                        city.id.as("cityId"),
                        city.cityName)).from(item)
                        .join(item.member, member)
                        .join(item.city, city)
                        .where(item.category.eq(Category.valueOf(categoryStr)))
                        .where(item.isDelete.eq(Boolean.FALSE))
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();
        return itemsWithCategory;
    }

    @Override
    public List<ItemListDto> getItemsSearchOnTitle(Pageable pageable, String categoryStr, String search) {
        List<ItemListDto> itemsSearchOntitle =
                queryFactory.select(Projections.fields(ItemListDto.class,
                        item.id.as("itemId"),
                        member.id.as("memberId"),
                        item.title, item.category, item.price, item.itemName,
                        item.imgUrl, item.registDate, item.isComplete,
                        city.id.as("cityId"),
                        city.cityName)).from(item)
                        .join(item.member, member)
                        .join(item.city, city)
                        .where(item.category.eq(Category.valueOf(categoryStr)))
                        .where(item.isDelete.eq(Boolean.FALSE))
                        .where(item.title.contains(search))
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();
        return itemsSearchOntitle;
    }

    @Override
    public List<ItemListDto> getItemsSearchOnCity(Pageable pageable, String categoryStr, Long cityId) {
        List<ItemListDto> itemsSearchOnCity =
                queryFactory.select(Projections.fields(ItemListDto.class,
                item.id.as("itemId"),
                member.id.as("memberId"),
                item.title, item.category, item.price, item.itemName,
                item.imgUrl, item.registDate, item.isComplete,
                city.id.as("cityId"),
                city.cityName)).from(item)
                .join(item.member, member)
                .join(item.city, city).on(city.id.eq(cityId))
                .where(item.category.eq(Category.valueOf(categoryStr)))
                .where(item.isDelete.eq(Boolean.FALSE))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        return itemsSearchOnCity;
    }

    @Override
    public ItemDetailDto getItemById(Long itemId) {
        ItemDetailDto itemDetail =
                queryFactory.select(Projections.fields(ItemDetailDto.class,
                        item.id.as("itemId"),
                        member.id.as("memberId"),
                        member.nickname, item.title, item.content, item.category,
                        item.price, item.itemName, item.imgUrl, item.registDate,
                        item.isComplete, city.id.as("cityId"), city.cityName)).from(item)
                        .join(item.member, member)
                        .join(item.city, city)
                        .where(item.id.eq(itemId))
                        .fetchOne();
        return itemDetail;
    }

    @Override
    public List<ItemListDto> getItemsByMember(Long itemId, Long memberId, Category category) {
       List<ItemListDto> itemsByMember =
               queryFactory.select(Projections.fields(ItemListDto.class,
                       item.id.as("itemId"),
                       member.id.as("memberId"),
                       item.title, item.category, item.price, item.itemName,
                       item.imgUrl, item.registDate, item.isComplete,
                       city.id.as("cityId"),
                       city.cityName)).from(item)
                       .join(item.member, member).on(member.id.eq(memberId))
                       .join(item.city, city)
                       .where(item.category.eq(category))
                       .where(item.isDelete.eq(Boolean.FALSE))
                       .where((item.isComplete.eq(Boolean.FALSE)))
                       .where(item.id.ne(itemId))
                       .fetch();
       return itemsByMember;
    }
}
