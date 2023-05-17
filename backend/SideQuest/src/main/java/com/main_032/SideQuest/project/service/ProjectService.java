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
import org.springframework.data.domain.Pageable;
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
        Project project = getProjectById(projectId);

        Member member = memberService.getLoginMember();
        if (project.getMemberId() != member.getId()) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);

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

    @Transactional
    public SingleResponseDto<ProjectGetResponseDto> getProject(Long projectId) {
        Project project = getProjectById(projectId);
        project.plusViews();
        projectRepository.save(project);

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
        Project project = getProjectById(projectId);

        project.updateDeleted(true);
        projectRepository.save(project);
        return;
    }

    @Transactional
    public void applyProject(Long projectId, ProjectApplyPostDto projectApplyPostDto) {
        Project project = getProjectById(projectId);

        Member member = memberService.getLoginMember();
        List<ProApplyCrew> proApplyCrewList = project.getProApplyCrewList();
        for (int i = 0; i < proApplyCrewList.size(); i++) {
            if (proApplyCrewList.get(i).getMemberId() == member.getId() && proApplyCrewList.get(i).isDeleted() == false)
                throw new BusinessLogicException(ExceptionCode.ALREADY_APPLY_PROJECT);
        }
        boolean exist = false;
        for (int i = 0; i < project.getProPositionCrewList().size(); i++) {
            if (project.getProPositionCrewList().get(i).getPosition().equals(projectApplyPostDto.getPosition())) {
                exist = true;
                break;
            }
        }
        if (exist == false) throw new BusinessLogicException(ExceptionCode.POSITION_NOT_FOUND);

        ProApplyCrew proApplyCrew = new ProApplyCrew(project, member.getId(), projectApplyPostDto.getPosition());
        proApplyCrewList.add(proApplyCrew);
        proApplyCrewService.postProApplyCrew(proApplyCrew);
        projectRepository.save(project);
    }

    public void cancelApply(Long projectId, ProjectCancelApplyPostDto projectCancelApplyPostDto) {
        Member member = memberService.getLoginMember();
        proApplyCrewService.cancelApply(projectId, member.getId(), projectCancelApplyPostDto);
    }

    public List<ProApplyCrewResponseDto> getApplyCrewList(Long projectId) {
        Project project = getProjectById(projectId);
        List<ProApplyCrew> proApplyCrewList = project.getProApplyCrewList();

        List<ProApplyCrewResponseDto> proApplyCrewResponseDtoList = new ArrayList<>();
        for (int i = 0; i < proApplyCrewList.size(); i++) {
            if (proApplyCrewList.get(i).isDeleted() == false) {
                ProApplyCrewResponseDto proApplyCrewResponseDto = new ProApplyCrewResponseDto(projectId,
                        proApplyCrewList.get(i).getPosition(),
                        memberService.getMemberGetResponseDto(proApplyCrewList.get(i).getMemberId()));
                proApplyCrewResponseDtoList.add(proApplyCrewResponseDto);
            }
        }

        return proApplyCrewResponseDtoList;
    }

    private Project getProjectById(Long projectId) {
        Optional<Project> findProject = projectRepository.findById(projectId);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        Project project = findProject.get();
        return project;
    }

    @Transactional
    public void acceptApplicant(Long projectId, Long memberId) {
        Project project = getProjectById(projectId);
        List<ProPositionCrew> proPositionCrewList = project.getProPositionCrewList();
        List<ProApplyCrew> proApplyCrewList = project.getProApplyCrewList();
        List<ProAcceptedCrew> proAcceptedCrewList = project.getProAcceptedCrewList();

        ProApplyCrew proApplyCrew = proApplyCrewService.getProApplyCrew(projectId, memberId);

        ProAcceptedCrew proAcceptedCrew = new ProAcceptedCrew();
        proAcceptedCrew.updateProject(project);
        proAcceptedCrew.updateMemberId(memberId);
        proAcceptedCrew.updatePosition(proApplyCrew.getPosition());

        proAcceptedCrewList.add(proAcceptedCrew);
        proAcceptedCrewService.saveProAcceptedCrew(proAcceptedCrew);

        for (int i = 0; i < proPositionCrewList.size(); i++) {
            if (proPositionCrewList.get(i).getPosition().equals(proApplyCrew.getPosition())) {
                proPositionCrewList.get(i).plusAcceptedNumber();
                proPositionCrewService.saveProPositionCrew(proPositionCrewList.get(i));
            }
        }

        for (int i = 0; i < proApplyCrewList.size(); i++) {
            if (proApplyCrewList.get(i).getPosition().equals(proApplyCrew.getPosition()) &&
                    proApplyCrewList.get(i).getMemberId() == proApplyCrew.getMemberId()) {
                proApplyCrewService.deleteApplyCrew(proApplyCrewList.get(i));
                proApplyCrewList.remove(proApplyCrewList.get(i));
            }
        }

        projectRepository.save(project);
    }

    @Transactional
    public void rejectApplicant(Long projectId, Long memberId) {
        Project project = getProjectById(projectId);
        List<ProApplyCrew> proApplyCrewList = project.getProApplyCrewList();
        ProApplyCrew proApplyCrew = proApplyCrewService.getProApplyCrew(projectId, memberId);

        for (int i = 0; i < proApplyCrewList.size(); i++) {
            if (proApplyCrewList.get(i).getPosition().equals(proApplyCrew.getPosition()) &&
                    proApplyCrewList.get(i).getMemberId() == proApplyCrew.getMemberId()) {
                proApplyCrewService.deleteApplyCrew(proApplyCrewList.get(i));
                proApplyCrewList.remove(proApplyCrewList.get(i));
            }
        }

        projectRepository.save(project);
    }

    @Transactional
    public void updateProjectStatus(Long projectId, ProUpdateStatusDto proUpdateStatusDto) {
        Project project = getProjectById(projectId);
        project.updateStatus(proUpdateStatusDto.getStatus());
        projectRepository.save(project);
    }

    public ProjectViewsTop5Dto getViewsTop5Project() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Project> projectList = projectRepository.getTop5ViewsProjects(pageable);
        List<ProjectGetResponseDto> projectGetResponseDtoList = new ArrayList<>();
        for (int i = 0; i < projectList.size(); i++) {
            ProjectGetResponseDto projectGetResponseDto = projectMapper.projectToProjectGetResponseDto(projectList.get(i));
            projectGetResponseDtoList.add(projectGetResponseDto);
        }
        ProjectViewsTop5Dto projectViewsTop5Dto = new ProjectViewsTop5Dto(projectGetResponseDtoList);
        return projectViewsTop5Dto;
    }

    public ProjectLikesTop5Dto getLikesTop5Project() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Project> projectList = projectRepository.getTop5LikesProjects(pageable);
        List<ProjectGetResponseDto> projectGetResponseDtoList = new ArrayList<>();
        for (int i = 0; i < projectList.size(); i++) {
            ProjectGetResponseDto projectGetResponseDto = projectMapper.projectToProjectGetResponseDto(projectList.get(i));
            projectGetResponseDtoList.add(projectGetResponseDto);
        }
        ProjectLikesTop5Dto projectLikesTop5Dto = new ProjectLikesTop5Dto(projectGetResponseDtoList);
        return projectLikesTop5Dto;
    }
}