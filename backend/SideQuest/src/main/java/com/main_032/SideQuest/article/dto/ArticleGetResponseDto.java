package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import com.main_032.SideQuest.member.dto.GetMemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@AllArgsConstructor
public class ArticleGetResponseDto {
    private Long articleId;
    private GetMemberResponseDto getMemberResponseDto;
    private String title;
    private String content;
    private ArticleCategory category;
    private int view;
    private int totalLikes;
    private LocalDateTime createdAt;
    private List<ArticleTechStackResponseDto> articleTechStackResponseDtoList;//아마 태그인거같음. 스택
    //    private int comments;
}
