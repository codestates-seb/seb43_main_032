package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.ProjectPostDto;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.mapper.ProjectMapper;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ProTechStackService proTechStackService;
    private final ProPositionCrewService proPositionCrewService;


    public void postProject(ProjectPostDto projectPostDto) {

        //매퍼를 통해 dto를 프로젝트로 생성
        Project project = projectMapper.projectPostDtoToProject(projectPostDto);
        Member member = memberService.getLoginMember();
        project.updateMemberId(member.getId());//project에 memberID에 넣어줌
        projectRepository.save(project);
        proTechStackService.postTechStack(projectPostDto.getProTechStackPostDto(), project.getId());
        proPositionCrewService.postPositionCrew(projectPostDto.getProPositionCrewPostDto(), project.getId());
        return;
    }



}