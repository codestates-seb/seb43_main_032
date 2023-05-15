package com.main_032.SideQuest.project.dto;

import com.main_032.SideQuest.project.entity.ProField;
import com.main_032.SideQuest.project.entity.ProPositionCrew;
import com.main_032.SideQuest.project.entity.ProTechStack;
import com.main_032.SideQuest.project.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
public class ProjectPostDto {

    private String title;
    private String content;
    private String writerPosition;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String thumbnailImgUrl;

    private ProTechStackPostDto proTechStackPostDto;
    private ProFieldPostDto proFieldPostDto;
    private ProPositionCrewPostDto proPositionCrewPostDto;
}
