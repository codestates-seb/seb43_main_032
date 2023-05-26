package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class ArticlePatchDto {
    @NotBlank(message = "제목 입력하세요")
    private String title;
    @NotBlank(message = "내용 입력하세요")
    private String content;
    @NotNull(message = "카테고리 입력하세요")
    private ArticleCategory category;

    private List<String> techList;
}
