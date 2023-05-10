package com.main_032.SideQuest.community.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Like extends BaseEntity {
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
}
