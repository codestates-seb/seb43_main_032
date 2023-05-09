package com.main_032.SideQuest.domain.project.entity;

import com.main_032.SideQuest.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String writerPosition;

    @Column
    private LocalDateTime startDate;

    @Column
    private LocalDateTime endDate;

    @Column
    private String thumbnailImgUrl;

    @Column
    private int views;

    @Column
    private String status;

    @Column
    private int totalLikes;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}