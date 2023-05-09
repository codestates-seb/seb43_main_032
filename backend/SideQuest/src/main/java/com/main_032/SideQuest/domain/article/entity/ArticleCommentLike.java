package com.main_032.SideQuest.domain.article.entity;

import com.main_032.SideQuest.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ArticleCommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleCommentLikeId;

    @ManyToOne
    @JoinColumn(name = "ARTICLE_COMMENT_ID")
    private ArticleComment articleComment;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
