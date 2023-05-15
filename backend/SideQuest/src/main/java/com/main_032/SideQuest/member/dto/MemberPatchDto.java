package com.main_032.SideQuest.member.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MemberPatchDto {
    private String name;
    private int yearOfDev;
    private String phone;
    private String position;
    private String aboutMe;
    private String profileImageUrl;
    private List<String> techList;
}
