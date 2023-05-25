package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProjectPatchDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private String writerPosition;
    @NotBlank
    private String startDate;
    private String endDate;

    private String thumbnailImageUrl;

    private ProTechStackPostDto techList;
    private ProFieldPostDto fieldList;
    private ProPositionCrewPostDto positionCrewList;
}
