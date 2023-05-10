package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.member.entity.Member;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ProComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "proAnswerId", nullable = false)
    private ProAnswer proAnswer;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private int totalLikes;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}