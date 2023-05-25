package com.main_032.SideQuest.community.dto.chat;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ChatPostDto {
    private Long receiverMemberId;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
}
