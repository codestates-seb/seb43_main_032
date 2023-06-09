package com.main_032.SideQuest.member.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MemberGetResponseDto {
    private Long memberId;
    private String name;
    private String email;
    private String phone;
    private String position;
    private String aboutMe;
    private String profileImageUrl;
    private String location;
    private int yearOfDev;
    private int totalStar;
    private int totalProject;
    private List<MemberTechStackResponseDto> techList;

    public MemberGetResponseDto(Long memberId, String name, String email, String phone, String position, String aboutMe, String profileImageUrl, String location, int yearOfDev, int totalStar, int totalProject) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.aboutMe = aboutMe;
        this.profileImageUrl = profileImageUrl;
        this.location = location;
        this.yearOfDev = yearOfDev;
        this.totalStar = totalStar;
        this.totalProject = totalProject;
    }

    public void updateMemberTechStackResponseDtoList(List<MemberTechStackResponseDto> memberTechStackResponseDtoList) {
        this.techList = memberTechStackResponseDtoList;
    }
}
