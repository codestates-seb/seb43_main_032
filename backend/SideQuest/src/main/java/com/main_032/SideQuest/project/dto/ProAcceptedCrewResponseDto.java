package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProAcceptedCrewResponseDto {
    private Long projectId;
    private Long memberId;
    private String position;
}
