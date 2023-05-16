package com.main_032.SideQuest.project.repository;

import com.main_032.SideQuest.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByMemberId(Long memberId);

}