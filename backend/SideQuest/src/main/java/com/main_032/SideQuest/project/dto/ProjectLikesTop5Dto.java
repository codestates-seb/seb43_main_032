package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProjectLikesTop5Dto {
    private List<ProjectGetResponseDto> projectList;
}
