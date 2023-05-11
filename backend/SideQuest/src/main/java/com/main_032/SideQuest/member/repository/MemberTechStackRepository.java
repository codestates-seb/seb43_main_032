package com.main_032.SideQuest.member.repository;

import com.main_032.SideQuest.member.entity.MemberTechStack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberTechStackRepository extends JpaRepository<MemberTechStack, Long> {
    List<MemberTechStack> findByMemberId(Long memberId);
}
