package com.main_032.SideQuest.domain.article.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ArticleComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleCommentId;

    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany
    @JoinColumn(name = "ARTICLE_ANSWER_ID")
    private ArticleAnswer articleAnswer;

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

    @OneToMany(mappedBy = "articleComment")
    private List<ArticleCommentLike> articleCommentLikeList = new ArrayList<>();
}
