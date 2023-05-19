package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@AllArgsConstructor
public class ArticleGetResponseDto {
    private Long articleId;
    private MemberGetResponseDto memberInfo;
    private String title;
    private String content;
    private ArticleCategory category;
    private int view;
    private int totalLikes;
    private boolean liked;
    private LocalDateTime createdAt;
    private List<ArticleTechStackResponseDto> techList;
}
