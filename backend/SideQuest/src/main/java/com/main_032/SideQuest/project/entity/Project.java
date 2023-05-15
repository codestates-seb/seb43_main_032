package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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
    private String startDate;

    @Column
    private String endDate;

    @Column
    private String thumbnailImageUrl;

    @Column
    private int views;

    @Column
    private ProjectStatus status = ProjectStatus.PROJECT_STATUS_1;

    @Column
    private int totalLikes;

    @OneToMany(mappedBy = "project")
    List<ProTechStack> proTechStackList;

    @OneToMany(mappedBy = "project")
    List<ProField> proFieldList;

    @OneToMany(mappedBy = "project")
    List<ProPositionCrew> proPositionCrewList;

    @OneToMany(mappedBy = "project")
    List<ProAcceptedCrew> proAcceptedCrewList;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;


    public Project(String title,
                   String content,
                   String writerPosition,
                   String startDate,
                   String endDate,
                   String thumbnailImageUrl) {
        this.title = title;
        this.content = content;
        this.writerPosition = writerPosition;
        this.startDate = startDate;
        this.endDate = endDate;
        this.thumbnailImageUrl = thumbnailImageUrl;
    }

    public void updateMemberId(Long memberId) {
        this.memberId = memberId;
    }
    public void updateTitle(String title) {
        this.title = title;
    }
    public void updateContent(String content) {
        this.content = content;
    }
    public void updateWriterPosition(String writerPosition) {
        this.writerPosition = writerPosition;
    }
    public void updateStartDate(String startDate) {
        this.startDate = startDate;
    }
    public void updateEndDate(String endDate) {
        this.endDate = endDate;
    }
    public void updateThumbnailImageUrl(String thumbnailImageUrl) {
        this.thumbnailImageUrl = thumbnailImageUrl;
    }
    public void updateProTechStackList(List<ProTechStack> proTechStackList) {
        this.proTechStackList = proTechStackList;
    }
    public void updateProFieldList(List<ProField> proFieldList) {
        this.proFieldList = proFieldList;
    }
    public void updateProPositionCrewList(List<ProPositionCrew> proPositionCrewList) {
        this.proPositionCrewList = proPositionCrewList;
    }
    public void updateProAcceptedCrew(List<ProAcceptedCrew> proAcceptedCrewList) {
        this.proAcceptedCrewList = proAcceptedCrewList;
    }
}

