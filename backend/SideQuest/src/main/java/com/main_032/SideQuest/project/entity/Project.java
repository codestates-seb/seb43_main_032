package com.main_032.SideQuest.project.entity;

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
public class Project extends BaseEntity {
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
    private ProjectStatus status;

    @Column
    private int totalLikes;


    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    //프로젝트 스택 리스트
    @OneToMany(mappedBy = "project")
    private List<ProTechStack> proTechStackList = new ArrayList<>();

    //프로젝트 분야 리스트
    @OneToMany(mappedBy = "project")
    private List<ProField> proFieldList = new ArrayList<>();

    //프로젝트 직업군,인원
    @OneToMany(mappedBy = "project")
    private List<ProPositionCrew> proPositionCrewList = new ArrayList<>();

    //프로젝트 지원 인원들
    @OneToMany(mappedBy = "project")
    private List<ProApplyCrew> proApplyCrewList = new ArrayList<>();
}

