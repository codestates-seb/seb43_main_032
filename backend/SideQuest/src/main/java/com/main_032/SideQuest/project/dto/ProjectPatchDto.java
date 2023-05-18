package com.main_032.SideQuest.project.dto;

import lombok.Getter;

@Getter
public class ProjectPatchDto {
    private String title;
    private String content;
    private String writerPosition;

    private String startDate;
    private String endDate;

    private String thumbnailImageUrl;

    private ProTechStackPostDto techList;
    private ProFieldPostDto fieldList;
    private ProPositionCrewPostDto positionCrewList;
}
