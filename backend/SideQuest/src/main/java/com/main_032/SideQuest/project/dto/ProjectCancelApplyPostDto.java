package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProjectCancelApplyPostDto {
    @NotBlank(message = "포지션 입력하세요")
    private String position;
}
