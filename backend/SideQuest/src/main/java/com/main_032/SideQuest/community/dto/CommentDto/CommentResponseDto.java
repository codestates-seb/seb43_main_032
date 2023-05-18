package com.main_032.SideQuest.community.dto.CommentDto;


import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private MemberGetResponseDto memberInfo;
    private Long commentId;
    private String content;
    private int totalLikes;
    private LocalDateTime createdAt;
}