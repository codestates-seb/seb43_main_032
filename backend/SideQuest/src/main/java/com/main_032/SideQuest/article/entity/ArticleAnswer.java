package com.main_032.SideQuest.article.entity;

import com.main_032.SideQuest.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ArticleAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleAnswerId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @Column
    private String content;

    @Column
    private int totalLikes;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    @OneToOne
    @JoinColumn(name = "ARTICLE_ACCEPTED_ID")
    private Article acceptedArticle;

    @OneToMany(mappedBy = "articleAnswer")
    private List<ArticleAnswerLike> articleAnswerLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "articleAnswer")
    private List<ArticleComment> articleCommentList = new ArrayList<>();
}
