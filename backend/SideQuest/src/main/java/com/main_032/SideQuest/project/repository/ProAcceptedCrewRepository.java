package com.main_032.SideQuest.project.repository;

import com.main_032.SideQuest.project.entity.ProAcceptedCrew;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ProAcceptedCrewRepository extends JpaRepository<ProAcceptedCrew, Long> {
    List<ProAcceptedCrew> findByMemberId(Long id);
}
