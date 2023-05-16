package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProjectPatchDto {
    private String title;
    private String content;
    private String writerPosition;

    private String startDate;
    private String endDate;

    private String thumbnailImageUrl;

    private ProTechStackPostDto proTechStackPostDto;
    private ProFieldPostDto proFieldPostDto;
    private ProPositionCrewPostDto proPositionCrewPostDto;
}
