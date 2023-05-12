package com.main_032.SideQuest.project.dto;

import com.main_032.SideQuest.project.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
@AllArgsConstructor
@Getter
public class ProjectDto {

    private Long id;
    private Long memberId;
    private String title;
    private String content;
    private String writerPosition;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String thumbnailImgUrl;
    private int views;
    private ProjectStatus status;
    private int totalLikes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean deleted;
    private List<Long> proTechStackList;
    private List<Long> proFieldList;
    private List<Long> proPositionCrewList;
    private List<Long> proApplyCrewList;

}
