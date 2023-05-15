package com.main_032.SideQuest.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class GetMemberResponseDto {
    private String name;
    private String email;
    private String phone;
    private String position;
    private String aboutMe;
    private String profileImageUrl;
    private String location;
    private int yearOfDev;
    private int totalStar;
    private List<MemberTechStackResponseDto> memberTechStackResponseDtoList;

}
