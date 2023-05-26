package com.main_032.SideQuest.member.dto;


import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class MemberPostDto {
    @Email(message = "이메일을 입력하세요")
    private String email;
    @NotBlank(message = "name을 입력하세요")
    private String name;
    @NotBlank(message = "비밀번호 입력하세요")
    private String password;
}
