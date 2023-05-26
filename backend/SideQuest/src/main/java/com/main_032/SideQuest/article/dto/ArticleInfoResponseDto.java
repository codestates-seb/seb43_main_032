package com.main_032.SideQuest.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ArticleInfoResponseDto {
    private Long articleId;
    private Long memberId;
    private String title;
    private String content;
    private int totalLikes;
    private LocalDateTime createdAt;
}
