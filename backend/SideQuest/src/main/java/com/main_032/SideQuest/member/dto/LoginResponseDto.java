package com.main_032.SideQuest.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponseDto {
    private String name;
    private String email;
    private String phone;
    private String aboutMe;
    private String profileImageUrl;
    private String position;
    private int yearOfDev;
    private int totalStar;
}
