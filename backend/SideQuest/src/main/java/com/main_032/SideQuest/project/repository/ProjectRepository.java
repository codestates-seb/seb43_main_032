package com.main_032.SideQuest.project.repository;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByMemberId(Long memberId);

    @Query("SELECT p FROM Project p WHERE p.deleted = 0")
    Page<Project> findAllProject(Pageable pageable);


    @Query("SELECT p FROM Project p ORDER BY p.views DESC")
    List<Project> getTop5ViewsProjects(Pageable pageable);
}