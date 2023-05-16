package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

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
//    private int comments;
    private int view;
    private int totalLikes;
    private List<ArticleTechStackResponseDto> techStackList;//아마 태그인거같음. 스택

}
