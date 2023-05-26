package com.main_032.SideQuest.community.dto.chat;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ChatPostDto {
    private Long receiverMemberId;
    @NotBlank(message = "제목 입력하세요")
    private String title;
    @NotBlank(message = "내용 입력하세요")
    private String content;
}
