package com.main_032.SideQuest.member.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MemberGetResponseDto {
    private String name;
    private String email;
    private String phone;
    private String position;
    private String aboutMe;
    private String profileImageUrl;
    private String location;
    private int yearOfDev;
    private int totalStar;
    private List<MemberTechStackResponseDto> techList;

    public MemberGetResponseDto(String name, String email, String phone, String position, String aboutMe, String profileImageUrl, String location, int yearOfDev, int totalStar) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.aboutMe = aboutMe;
        this.profileImageUrl = profileImageUrl;
        this.location = location;
        this.yearOfDev = yearOfDev;
        this.totalStar = totalStar;
    }

    public void updateMemberTechStackResponseDtoList(List<MemberTechStackResponseDto> memberTechStackResponseDtoList) {
        this.techList = memberTechStackResponseDtoList;
    }
}
