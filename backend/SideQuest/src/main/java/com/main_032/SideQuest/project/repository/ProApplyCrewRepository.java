package com.main_032.SideQuest.project.repository;

import com.main_032.SideQuest.project.entity.ProApplyCrew;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProApplyCrewRepository extends JpaRepository<ProApplyCrew, Long> {
    Optional<ProApplyCrew> findByMemberIdAndProjectIdAndDeleted(Long memberId, Long projectId, boolean deleted);
}
