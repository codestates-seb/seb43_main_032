package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProjectGetResponseDto;
import com.main_032.SideQuest.project.dto.ProjectPostDto;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

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
                project.getMemberId(),
                project.getTitle(),
                project.getContent(),
                project.getWriterPosition(),
                project.getStartDate(),
                project.getEndDate(),
                project.getThumbnailImageUrl(),
                project.getViews(),
                project.getStatus().getDisplayName(),
                project.getTotalLikes()
        );
        return projectGetResponseDto;
    }
}
