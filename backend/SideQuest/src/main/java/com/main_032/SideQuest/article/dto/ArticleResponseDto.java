package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ArticleResponseDto {
    private Long id;
    private String name;
    private String profileImageUrl;
    private int totalStar;
    private ArticleCategory category;
    private String title;
    private String content;
    private int views;
    private List<ArticleTechStackResponseDto> articleTechStackResponseDtoList;
    //private int totalComment;


}
