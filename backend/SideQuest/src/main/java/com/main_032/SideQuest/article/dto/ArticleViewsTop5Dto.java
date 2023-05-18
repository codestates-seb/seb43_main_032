package com.main_032.SideQuest.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ArticleViewsTop5Dto {
    private List<ArticleGetResponseDto> articleList;
}
