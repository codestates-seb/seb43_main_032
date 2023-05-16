package com.main_032.SideQuest.member.dto;

import lombok.Getter;

@Getter
public class LoginResponseDto {
    private String name;

    public LoginResponseDto(String name) {
        this.name = name;
    }
}
