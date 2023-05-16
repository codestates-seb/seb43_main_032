package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ProjectPostDto {

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
