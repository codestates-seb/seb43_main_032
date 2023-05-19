package com.main_032.SideQuest.community.entity;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
// 댓글

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private Long id;

    @Column
    private Long memberId; //commentWriter

    @Column
    private Category category;

    @Column
    private String content;

    @Column
    private int totalLikes;

    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    @Column
    private Long articleId;

    @Column
    private Long projectId;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;


    public void setContent(String content) {
        this.content = content;
    }
    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
    public void setAnswer(Answer answer){this.answer = answer;}
    public Comment(Long memberId, Category category, String content, int totalLikes, Answer answer, Long articleId,Long projectId) {

        this.memberId = memberId;
        this.category = category;
        this.content = content;
        this.totalLikes = totalLikes;
        this.answer = answer;
        this.articleId = articleId;
        this.projectId = projectId;
    }

    public void plusTotalLikes() {
        this.totalLikes += 1;
    }

    public void minusTotalLikes() {
        this.totalLikes -= 1;
    }
}