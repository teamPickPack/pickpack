package com.pickpack.flightservice.repository;

import com.pickpack.flightservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member getById(Long memberId);
}
