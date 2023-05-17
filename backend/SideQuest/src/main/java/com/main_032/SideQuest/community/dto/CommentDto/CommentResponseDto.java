package com.main_032.SideQuest.community.dto.CommentDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private String name;
    private int totalLikes;
    private String content;
    private LocalDateTime createAt;
}