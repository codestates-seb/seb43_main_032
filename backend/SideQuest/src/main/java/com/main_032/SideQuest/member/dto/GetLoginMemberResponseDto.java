package com.main_032.SideQuest.member.dto;

import com.main_032.SideQuest.member.entity.MemberTechStack;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class GetLoginMemberResponseDto {
    private String name;
    private String email;
    private String phone;
    private String position;
    private String aboutMe;
    private String profileImageUrl;
    private int yearOfDev;
    private int totalStar;
    private List<MemberTechStackPostResponseDto> memberTechStackPostResponseDtoList;

}
