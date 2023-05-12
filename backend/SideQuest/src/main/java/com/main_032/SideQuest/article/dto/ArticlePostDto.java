package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.Getter;

@Getter
public class ArticlePostDto {

    private String title;

    private String content;

    private ArticleCategory articleCategory;

//    private String tag??
}
