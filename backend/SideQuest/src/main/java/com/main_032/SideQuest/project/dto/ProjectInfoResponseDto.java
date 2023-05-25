package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProjectInfoResponseDto {
    private Long projectId;
    private Long memberId;
    private String title;
    private String content;
    private int totalLikes;
    private String startDate;
    private String endDate;
}
