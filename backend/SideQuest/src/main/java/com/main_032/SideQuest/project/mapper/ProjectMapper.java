package com.main_032.SideQuest.project.mapper;

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
                projectPostDto.getThumbnailImgUrl());
        return project;
    }
}
