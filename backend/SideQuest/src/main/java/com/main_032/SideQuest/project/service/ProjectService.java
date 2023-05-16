package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.*;
import com.main_032.SideQuest.project.entity.*;
import com.main_032.SideQuest.project.mapper.ProjectMapper;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
    private final ProApplyCrewService proApplyCrewService;
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

        ProjectGetResponseDto projectGetResponseDto = projectMapper.projectToProjectGetResponseDto(project);

        projectGetResponseDto.updateProTechStackResponseDtoList(proTechStackService.proTechStackListToProTechStackResponseDtoList(project.getProTechStackList()));
        projectGetResponseDto.updateProFieldResponseDtoList(proFieldService.proFieldListToProFieldResponseDtoList(project.getProFieldList()));
        projectGetResponseDto.updateProPositionCrewResponseDtoList(proPositionCrewService.proPositionCrewListToProPositionCrewDtoList(project.getProPositionCrewList()));
        projectGetResponseDto.updateProAcceptedCrewResponseDtoList(proAcceptedCrewService.proAcceptedCrewToProAcceptedCrewDtoList(project.getProAcceptedCrewList()));

        SingleResponseDto<ProjectGetResponseDto> singleResponseDto = new SingleResponseDto<>(projectGetResponseDto);
        return singleResponseDto;
    }

    public MultiResponseDto<ProjectGetResponseDto> getAllProjects(int page, int size) {
        Page<Project> projectPage = projectRepository.findAllProject(PageRequest.of(page, size, Sort.by("id").descending()));
        List<Project> projectList = projectPage.getContent();
        List<ProjectGetResponseDto> projectGetResponseDtoList = new ArrayList<>();
        for (int i = 0; i < projectList.size(); i++) {
            Project project = projectList.get(i);
            ProjectGetResponseDto projectGetResponseDto = projectMapper.projectToProjectGetResponseDto(project);
            projectGetResponseDto.updateProTechStackResponseDtoList(proTechStackService.proTechStackListToProTechStackResponseDtoList(project.getProTechStackList()));
            projectGetResponseDto.updateProFieldResponseDtoList(proFieldService.proFieldListToProFieldResponseDtoList(project.getProFieldList()));
            projectGetResponseDto.updateProPositionCrewResponseDtoList(proPositionCrewService.proPositionCrewListToProPositionCrewDtoList(project.getProPositionCrewList()));
            projectGetResponseDto.updateProAcceptedCrewResponseDtoList(proAcceptedCrewService.proAcceptedCrewToProAcceptedCrewDtoList(project.getProAcceptedCrewList()));
            projectGetResponseDtoList.add(projectGetResponseDto);
        }
        MultiResponseDto<ProjectGetResponseDto> multiResponseDto = new MultiResponseDto<>(projectGetResponseDtoList, projectPage);
        return multiResponseDto;
    }

    @Transactional
    public void deleteProject(Long projectId) {
        Optional<Project> findProject = projectRepository.findById(projectId);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        Project project = findProject.get();

        project.updateDeleted(true);
        projectRepository.save(project);
        return;
    }

    @Transactional
    public void applyProject(Long projectId, ProjectApplyPostDto projectApplyPostDto) {
        Optional<Project> findProject = projectRepository.findById(projectId);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        Project project = findProject.get();

        Member member = memberService.getLoginMember();
        List<ProApplyCrew> proApplyCrewList = project.getProApplyCrewList();
        for (int i = 0; i < proApplyCrewList.size(); i++) {
            if(proApplyCrewList.get(i).getMemberId() == member.getId() && proApplyCrewList.get(i).isDeleted() == false) throw new BusinessLogicException(ExceptionCode.ALREADY_APPLY_PROJECT);
        }
        boolean exist = false;
        for (int i = 0; i < project.getProPositionCrewList().size(); i++) {
            if(project.getProPositionCrewList().get(i).getPosition().equals(projectApplyPostDto.getPosition())) {
                exist = true;
                break;
            }
        }
        if(exist == false) throw new BusinessLogicException(ExceptionCode.POSITION_NOT_FOUND);

        ProApplyCrew proApplyCrew = new ProApplyCrew(project, member.getId(), projectApplyPostDto.getPosition());
        proApplyCrewList.add(proApplyCrew);
        proApplyCrewService.postProApplyCrew(proApplyCrew);
        projectRepository.save(project);
    }

    public void cancelApply(Long projectId, ProjectCancelApplyPostDto projectCancelApplyPostDto) {
        Member member = memberService.getLoginMember();
        proApplyCrewService.cancelApply(projectId, member.getId(), projectCancelApplyPostDto);
    }
}