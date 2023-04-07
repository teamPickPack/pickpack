package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.api.response.ListRes;
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
    public ListRes getItemsWithCategory(Pageable pageable, String categoryStr) {
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
                        .where(item.isComplete.eq(Boolean.FALSE))
                        .orderBy(item.registDate.desc(), item.price.asc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize() + 1)
                        .fetch();
        Boolean hasNext = true;
        if(itemsWithCategory.size() <= pageable.getPageSize()){
            hasNext = false;
        }else{
            itemsWithCategory.remove(12);
        }
        return new ListRes(itemsWithCategory, hasNext);
    }

    @Override
    public ListRes getItemsSearchOnTitle(Pageable pageable, String categoryStr, String search) {
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
                        .where(item.isComplete.eq(Boolean.FALSE))
                        .where(item.title.contains(search))
                        .orderBy(item.registDate.desc(), item.price.asc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize() + 1)
                        .fetch();

        Boolean hasNext = true;
        if(itemsSearchOntitle.size() <= pageable.getPageSize()){
            hasNext = false;
        }else{
            itemsSearchOntitle.remove(12);
        }
        return new ListRes(itemsSearchOntitle, hasNext);
    }

    @Override
    public ListRes getItemsSearchOnCity(Pageable pageable, String categoryStr, Long cityId) {
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
                        .where(item.isComplete.eq(Boolean.FALSE))
                        .orderBy(item.registDate.desc(), item.price.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        Boolean hasNext = true;
        if(itemsSearchOnCity.size() <= pageable.getPageSize()){
            hasNext = false;
        }else{
            itemsSearchOnCity.remove(12);
        }
        return new ListRes(itemsSearchOnCity, hasNext);
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
                       .orderBy(item.registDate.desc())
                       .fetch();
       return itemsByMember;
    }
}
