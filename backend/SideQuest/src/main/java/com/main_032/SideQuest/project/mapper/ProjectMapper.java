package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProjectDto;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ProjectMapper {

    public Project projectDtoToProject(ProjectDto projectDto) {
        Project project = new Project();
        project.updateTitle(projectDto.getTitle());
        project.updateContent(projectDto.getContent());
        project.updateWriterPosition(projectDto.getWriterPosition());
        project.updateStartDate(projectDto.getStartDate());
        project.updateEndDate(projectDto.getEndDate());
        project.updateThumbnailImgUrl(projectDto.getThumbnailImgUrl());
        project.updateViews(projectDto.getViews());
        project.updateStatus(projectDto.getStatus());
        project.updateTotalLikes(projectDto.getTotalLikes());
        project.updateCreatedAt(projectDto.getCreatedAt());
        project.updateUpdatedAt(projectDto.getUpdatedAt());
        project.updateDeleted(projectDto.isDeleted());
        return project;
    }

    public ProjectDto projectToProjectDto(Project project) {
        ProjectDto projectDto = new ProjectDto();
        projectDto.getId(project.getId());
        projectDto.getMemberId(project.getMemberId());
        projectDto.getTitle(project.getTitle());
        projectDto.getContent(project.getContent());
        projectDto.getWriterPosition(project.getWriterPosition());
        projectDto.getStartDate(project.getStartDate());
        projectDto.getEndDate(project.getEndDate());
        projectDto.getThumbnailImgUrl(project.getThumbnailImgUrl());
        projectDto.getViews(project.getViews());
        projectDto.getStatus(project.getStatus());
        projectDto.getTotalLikes(project.getTotalLikes());
        projectDto.getCreatedAt(project.getCreatedAt());
        projectDto.getUpdatedAt(project.getUpdatedAt());
        projectDto.isDeleted(project.isDeleted());
        // Assuming that the associated lists are managed in a separate service
        projectDto.getProTechStackList(new ArrayList<>());
        projectDto.getProFieldList(new ArrayList<>());
        projectDto.getProPositionCrewList(new ArrayList<>());
        projectDto.getProApplyCrewList(new ArrayList<>());
    };
    return projectDto;
}
