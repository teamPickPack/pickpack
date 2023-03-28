package com.pickpack.itemservice.repository.member;

import com.pickpack.itemservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
