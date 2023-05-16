package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@AllArgsConstructor
public class ArticleGetResponseDto {
    private Long id;
    private String name;
    private String profileImageUrl;
    private int totalStar;
    private String title;
    private String content;
    private ArticleCategory category;
    private int view;
    private int totalLikes;
    private LocalDateTime createdAt;
    private List<ArticleTechStackResponseDto> articleTechStackResponseDtoList;//아마 태그인거같음. 스택
    //    private int comments;
}
