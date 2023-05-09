package com.main_032.SideQuest.domain.article.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ArticleAnswerLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleAnswerLikeId;

    @ManyToOne
    @JoinColumn(name = "ARTICLE_ANSWER_ID")
    private ArticleAnswer articleAnswer;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
