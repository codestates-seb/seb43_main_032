package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProUpdateStatusDto {
    @NotBlank
    private String status;
}
