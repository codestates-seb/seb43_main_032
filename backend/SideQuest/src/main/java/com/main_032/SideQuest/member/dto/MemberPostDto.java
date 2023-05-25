package com.main_032.SideQuest.member.dto;


import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class MemberPostDto {
    @Email
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String password;
}
