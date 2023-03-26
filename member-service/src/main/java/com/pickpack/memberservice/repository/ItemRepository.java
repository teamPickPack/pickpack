package com.pickpack.memberservice.repository;

import com.pickpack.memberservice.entity.Item;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    // 마이페이지 - 구매한 목록(살게요)
    @Query("select i from Item i join i.member m where m.id = :memberId and i.category = :cat")
    List<Item> findBoughtList(@Param("cat")String category, Long memberId);

}
