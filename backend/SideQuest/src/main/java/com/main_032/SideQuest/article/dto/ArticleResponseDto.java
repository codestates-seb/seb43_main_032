package com.main_032.SideQuest.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ArticleResponseDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private List<ArticleTechStackResponseDto> techStackList;
    //private int totalComment;


}
