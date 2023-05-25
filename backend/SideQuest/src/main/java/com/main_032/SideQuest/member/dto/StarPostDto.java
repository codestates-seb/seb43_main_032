package com.main_032.SideQuest.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class StarPostDto {
    private Long memberId;
    @NotBlank
    private int star;
}
