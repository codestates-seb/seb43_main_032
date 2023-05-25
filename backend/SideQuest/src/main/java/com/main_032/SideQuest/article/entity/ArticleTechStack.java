package com.main_032.SideQuest.article.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ArticleTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long articleId;

    @Column
    private String tech;

    public void updateArticleId(Long articleId){this.articleId = articleId;}
    public void updateTech(String tech){this.tech=tech;}
}
