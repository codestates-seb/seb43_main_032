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
public class Article extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long memberId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private ArticleCategory category;

    @Column
    private int views;

    @OneToOne
    @JoinColumn(name = "ANSWER_ID")
    private ArticleAnswer acceptedAnswer;

    @Column
    private int totalLikes;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    @OneToMany(mappedBy = "article")
    private List<ArticleTechStack> articleTechStackList = new ArrayList<>();

    @OneToMany(mappedBy = "article")
    private List<ArticleAnswer> articleAnswerList = new ArrayList<>();
}
