package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class ProjectPostDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String writerPosition;
    @NotBlank
    private String startDate;
    private String endDate;

    private String thumbnailImageUrl;

    private ProTechStackPostDto techList;
    private ProFieldPostDto fieldList;
    private ProPositionCrewPostDto positionCrewList;
}
