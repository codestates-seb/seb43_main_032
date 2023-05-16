package com.main_032.SideQuest.community.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@NoArgsConstructor
@Entity
@Getter
public class Likes extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long memberId;

    @Column
    private Category category;

    @Column
    private Long projectId;

    @Column
    private Long articleId;

    @Column
    private Long answerId;

    @Column
    private Long commentId;

    public Likes(Long memberId, Category category, Long commentId) {
        this.memberId = memberId;
        this.category = category;
        this.commentId = commentId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

}
