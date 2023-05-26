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
    private Long projectId = -1L;

    @Column
    private Long articleId = -1L;

    @Column
    private Long answerId = -1L;

    @Column
    private Long commentId = -1L;

    public Likes(Long memberId, Category category, Long uniteId) {
        this.memberId = memberId;
        this.category = category;

        if(category.equals(Category.PROJECT)) {
            this.projectId = uniteId;
        }
        else if(category.equals(Category.ARTICLE)) {
            this.articleId = uniteId;
        }
        else if(category.equals(Category.ANSWER)) {
            this.answerId = uniteId;
        }
        else {
            this.commentId = uniteId;
        }
    }

}
