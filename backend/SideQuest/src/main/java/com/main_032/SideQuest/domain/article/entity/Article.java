package com.main_032.SideQuest.domain.article.entity;

import com.main_032.SideQuest.domain.BaseEntity;
import com.main_032.SideQuest.domain.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column
    private String title;

    @Column
    private String content;

    // 어떠한 상태값이나 카테고리를 관리하느것은 ENUM 을 사용하는것이 관리하기 편하고, 오류 처리하기 편함
    @Column
    private ArticleCategory category;

    @Column
    private int views;

    @Column
    private ArticleStatus status;

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

    // 로직 처리는 엔티티에서 하는것이 좋음, 도메인 로직은 서비스 레이어에서 수행하는 것이 아니라 엔티티에 위치하는것이 좋음
    // 특정 로직에 대한 검증을 도메인 엔티티 단위 테스트에서 검증할 수 있고
    // 객체에 역할이 명확해지고, 책임을 가지는 유의미한 엔티티가 생성될 수 있음

    /**
     *
     *
     article.setStatus(); // 지양

     article.makeHidden() // 지향


     public void makeHidden() {
     if(this.status == ArticleStatus.HIDDEN) {
     throw new IllegalArgumentException("");
     }
     this.status = ArticleStatus.HIDDEN;
     }

     */
}
