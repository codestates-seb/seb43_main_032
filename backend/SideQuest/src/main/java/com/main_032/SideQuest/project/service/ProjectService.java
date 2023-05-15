package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.*;
import com.main_032.SideQuest.project.entity.ProField;
import com.main_032.SideQuest.project.entity.ProPositionCrew;
import com.main_032.SideQuest.project.entity.ProTechStack;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.mapper.ProjectMapper;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final MemberService memberService;
    private final ProTechStackService proTechStackService;
    private final ProFieldService proFieldService;
    private final ProPositionCrewService proPositionCrewService;
    private final ProAcceptedCrewService proAcceptedCrewService;

    @Transactional
    public void postProject(ProjectPostDto projectPostDto) {
        Project project = projectMapper.projectPostDtoToProject(projectPostDto);
        Member member = memberService.getLoginMember();
        project.updateMemberId(member.getId());
        project = projectRepository.save(project);
        proTechStackService.postTechStack(project, projectPostDto.getProTechStackPostDto());
        proFieldService.postField(project, projectPostDto.getProFieldPostDto());
        proPositionCrewService.postPositionCrew(project, projectPostDto.getProPositionCrewPostDto());
        return;
    }

    @Transactional
    public void updateProject(Long projectId, ProjectPatchDto projectPatchDto) {
        Optional<Project> findProject = projectRepository.findById(projectId);
        findProject.orElseThrow(()->new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        Project project = findProject.get();

        Member member = memberService.getLoginMember();
        if(project.getMemberId() != member.getId()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);

        project.updateTitle(projectPatchDto.getTitle());
        project.updateContent(projectPatchDto.getContent());
        project.updateWriterPosition(projectPatchDto.getWriterPosition());

        project.updateStartDate(projectPatchDto.getStartDate());
        project.updateEndDate(projectPatchDto.getEndDate());

        project.updateThumbnailImageUrl(projectPatchDto.getThumbnailImageUrl());

        List<ProTechStack> proTechStackList = proTechStackService.updateProTechStack(project, projectPatchDto.getProTechStackPostDto());
        project.updateProTechStackList(proTechStackList);
        List<ProField> proFieldList = proFieldService.updateProField(project, projectPatchDto.getProFieldPostDto());
        project.updateProFieldList(proFieldList);
        List<ProPositionCrew> proPositionCrewList = proPositionCrewService.updateProPositionCrew(project, projectPatchDto.getProPositionCrewPostDto());
        project.updateProPositionCrewList(proPositionCrewList);

        projectRepository.save(project);

        return;
    }

    public SingleResponseDto<ProjectGetResponseDto> getProject(Long projectId) {
        Optional<Project> findProject = projectRepository.findById(projectId);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        Project project = findProject.get();

        ProjectGetResponseDto projectGetResponseDto = new ProjectGetResponseDto(
                project.getId(),
                project.getMemberId(),
                project.getTitle(),
                project.getContent(),
                project.getWriterPosition(),
                project.getStartDate(),
                project.getEndDate(),
                project.getThumbnailImageUrl(),
                project.getViews(),
                project.getStatus().getDisplayName(),
                project.getTotalLikes(),
                proTechStackService.proTechStackListToProTechStackResponseDtoList(project.getProTechStackList()),
                proFieldService.proFieldListToProFieldResponseDtoList(project.getProFieldList()),
                proPositionCrewService.proPositionCrewListToProPositionCrewDtoList(project.getProPositionCrewList()),
                proAcceptedCrewService.proAcceptedCrewToProAcceptedCrewDtoList(project.getProAcceptedCrewList())
        );
        SingleResponseDto<ProjectGetResponseDto> singleResponseDto = new SingleResponseDto<>(projectGetResponseDto);
        return singleResponseDto;
    }
}