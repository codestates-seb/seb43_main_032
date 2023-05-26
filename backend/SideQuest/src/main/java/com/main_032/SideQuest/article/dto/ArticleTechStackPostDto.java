package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@AllArgsConstructor
public class ArticleTechStackPostDto {
    @Column
    private Long articleId;

    @Column
    private String tech;
}
