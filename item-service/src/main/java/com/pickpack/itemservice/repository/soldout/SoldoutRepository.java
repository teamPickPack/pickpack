package com.pickpack.itemservice.repository.soldout;

import com.pickpack.itemservice.entity.Soldout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoldoutRepository extends JpaRepository<Soldout, Long> {
}
