package com.main_032.SideQuest.article.entity;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class ArticleAnswer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @Column
    private String content;

    @Column
    private int totalLikes;

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
