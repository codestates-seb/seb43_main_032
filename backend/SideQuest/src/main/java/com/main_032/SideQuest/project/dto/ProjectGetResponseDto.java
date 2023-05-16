package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import java.util.List;

@Getter
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

    public ProjectGetResponseDto(Long projectId, Long memberId, String title, String content, String writerPosition, String startDate, String endDate, String thumbnailImageUrl, int views, String status, int totalLikes) {
        this.projectId = projectId;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
        this.writerPosition = writerPosition;
        this.startDate = startDate;
        this.endDate = endDate;
        this.thumbnailImageUrl = thumbnailImageUrl;
        this.views = views;
        this.status = status;
        this.totalLikes = totalLikes;
    }

    private List<ProTechStackResponseDto> techStackList;
    private List<ProFieldResponseDto> fieldList;
    private List<ProPositionCrewResponseDto> positionCrewList;
    private List<ProAcceptedCrewResponseDto> acceptedCrewList;

    public void updateProTechStackResponseDtoList(List<ProTechStackResponseDto> proTechStackResponseDtoList) {
        this.techStackList = proTechStackResponseDtoList;
    }

    public void updateProFieldResponseDtoList(List<ProFieldResponseDto> proFieldResponseDtoList) {
        this.fieldList = proFieldResponseDtoList;
    }

    public void updateProPositionCrewResponseDtoList(List<ProPositionCrewResponseDto> proPositionCrewResponseDtoList) {
        this.positionCrewList = proPositionCrewResponseDtoList;
    }

    public void updateProAcceptedCrewResponseDtoList(List<ProAcceptedCrewResponseDto> proAcceptedCrewResponseDtoList) {
        this.acceptedCrewList = proAcceptedCrewResponseDtoList;
    }
}
