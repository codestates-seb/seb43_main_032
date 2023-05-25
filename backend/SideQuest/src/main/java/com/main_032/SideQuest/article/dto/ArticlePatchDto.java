package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class ArticlePatchDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private ArticleCategory category;

    private List<String> techList;
}
