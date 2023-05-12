package com.main_032.SideQuest.member.dto;

import lombok.Getter;

@Getter
public class MemberLoginResponseDto {
    private String name;

    public MemberLoginResponseDto(String name) {
        this.name = name;
    }
}
