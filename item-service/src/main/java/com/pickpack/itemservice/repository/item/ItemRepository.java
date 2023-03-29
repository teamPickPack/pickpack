package com.pickpack.itemservice.repository.item;

import com.pickpack.itemservice.entity.Category;
import com.pickpack.itemservice.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemRepositoryCustom{
}
