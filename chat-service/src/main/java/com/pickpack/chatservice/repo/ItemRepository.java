package com.pickpack.chatservice.repo;

import com.pickpack.chatservice.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ItemRepository extends JpaRepository<Item,Long> {
    String findImgUrlById(String itemId);
}
