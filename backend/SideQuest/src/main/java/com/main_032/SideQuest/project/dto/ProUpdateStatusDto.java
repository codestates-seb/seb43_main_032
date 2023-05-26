package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProUpdateStatusDto {
    @NotBlank(message = "상태 입력하세요")
    private String status;
}
