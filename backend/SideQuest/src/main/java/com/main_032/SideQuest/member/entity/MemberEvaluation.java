package com.main_032.SideQuest.member.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberEvaluation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private Long giverMemberId;

    @Column
    private Long receiverMemberId;

    @Column
    private Long projectId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private int star;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}