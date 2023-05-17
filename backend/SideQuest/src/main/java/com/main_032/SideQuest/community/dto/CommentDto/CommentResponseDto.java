package com.main_032.SideQuest.community.dto.CommentDto;


import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private MemberGetResponseDto memberGetResponseDto;
    private int totalLikes;
    private String content;
    private LocalDateTime createAt;
}