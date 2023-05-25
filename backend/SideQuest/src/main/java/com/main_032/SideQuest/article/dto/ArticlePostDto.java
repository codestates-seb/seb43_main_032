package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.Getter;

import java.util.List;

@Getter
public class ArticlePostDto {

    private String title;

    private String content;

    private ArticleCategory category;

    private List<String> techList;
}
