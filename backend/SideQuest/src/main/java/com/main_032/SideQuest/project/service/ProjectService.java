package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.member.dto.GetLoginMemberResponseDto;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.entity.MemberTechStack;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.ProjectDto;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.mapper.ProjectMapper;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@AllArgsConstructor
@Service
public class ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public ProjectDto getProject(Long id) {
        Project project = getProjectEntity(id);
        return projectMapper.projectToProjectDto(project);
    }

    public void updateProject(Long id, ProjectDto projectDto) {
        Project project = getProjectEntity(id);
        project.updated(projectDto);
        projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        Project project = getProjectEntity(id);
        projectRepository.delete(project);
    }

    private Project getProjectEntity(Long id) {
        Optional<Project> findProject = projectRepository.findById(id);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        return findProject.get();
    }
}