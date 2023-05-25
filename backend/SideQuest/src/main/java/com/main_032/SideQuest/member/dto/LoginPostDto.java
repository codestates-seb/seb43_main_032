package com.main_032.SideQuest.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginPostDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
