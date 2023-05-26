package com.main_032.SideQuest.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class LoginPostDto {
    @Email(message = "이메일 입력하세요")
    private String email;
    @NotBlank(message = "비밀번호 입력하세요")
    private String password;
}
