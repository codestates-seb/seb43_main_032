package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import com.main_032.SideQuest.article.entity.ArticleTechStack;
import lombok.Getter;

import java.util.List;

@Getter
public class ArticlePatchDto {
    private String title;

    private String content;

    private ArticleCategory articleCategory;

    private List<String> articleTechStackList;
}
