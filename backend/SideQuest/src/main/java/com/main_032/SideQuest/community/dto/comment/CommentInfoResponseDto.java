package com.main_032.SideQuest.community.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentInfoResponseDto {
    private Long commentId;
    private Long memberId;
    private String content;
    private int totalLikes;
    private LocalDateTime createdAt;
}
