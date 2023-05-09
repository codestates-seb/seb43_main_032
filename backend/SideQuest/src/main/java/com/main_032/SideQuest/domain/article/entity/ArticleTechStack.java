package com.main_032.SideQuest.domain.article.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ArticleTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleTechStackId;

    @OneToMany
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @Column
    private String tech;
}
