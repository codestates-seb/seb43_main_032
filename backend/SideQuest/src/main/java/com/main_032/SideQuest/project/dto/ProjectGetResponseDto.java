package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProjectGetResponseDto {
    private Long projectId;
    private Long memberId;

    private String title;
    private String content;
    private String writerPosition;

    private String startDate;
    private String endDate;

    private String thumbnailImageUrl;

    private int views;
    private String status;
    private int totalLikes;

    private List<ProTechStackResponseDto> proTechStackResponseDtoList;
    private List<ProFieldResponseDto> proFieldResponseDtoList;
    private List<ProPositionCrewResponseDto> proPositionCrewResponseDtoList;
    private List<ProAcceptedCrewResponseDto> proAcceptedCrewResponseDtoList;
}
