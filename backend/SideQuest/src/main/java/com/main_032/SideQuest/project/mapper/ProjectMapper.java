package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.ProjectGetResponseDto;
import com.main_032.SideQuest.project.dto.ProjectPostDto;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
    MemberService memberService;

    public ProjectMapper(MemberService memberService) {
        this.memberService = memberService;
    }

    public Project projectPostDtoToProject(ProjectPostDto projectPostDto) {
        Project project = new Project(projectPostDto.getTitle(),
                projectPostDto.getContent(),
                projectPostDto.getWriterPosition(),
                projectPostDto.getStartDate(),
                projectPostDto.getEndDate(),
                projectPostDto.getThumbnailImageUrl());
        return project;
    }

    public ProjectGetResponseDto projectToProjectGetResponseDto(Project project) {
        ProjectGetResponseDto projectGetResponseDto = new ProjectGetResponseDto(
                project.getId(),
                memberService.getMemberInfo(project.getMemberId()).getData(),
                project.getTitle(),
                project.getContent(),
                project.getWriterPosition(),
                project.getStartDate(),
                project.getEndDate(),
                project.getThumbnailImageUrl(),
                project.getViews(),
                project.getStatus(),
                project.getTotalLikes(),
                project.getCreatedAt()
        );
        return projectGetResponseDto;
    }
}
