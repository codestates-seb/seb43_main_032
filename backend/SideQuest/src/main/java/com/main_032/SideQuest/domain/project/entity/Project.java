package com.main_032.SideQuest.domain.project.entity;

import com.main_032.SideQuest.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member; //작성자 식별자

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String writerPosition;

    @Column
    private Date startdate;

    @Column
    private Date enddate;

    @Column
    private String imageUrl;

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
