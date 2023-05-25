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

    @Column(columnDefinition = "TEXT")
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
    private String status = "모집중";

    @Column
    private int totalLikes;

    @Column
    private int totalAnswers;

    @OneToMany(mappedBy = "project")
    List<ProTechStack> proTechStackList;

    @OneToMany(mappedBy = "project")
    List<ProField> proFieldList;

    @OneToMany(mappedBy = "project")
    List<ProPositionCrew> proPositionCrewList;

    @OneToMany(mappedBy = "project")
    List<ProApplyCrew> proApplyCrewList;

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
    public void updateTotalAnswers(int totalAnswers){this.totalAnswers = totalAnswers;}
    public void updateProTechStackList(List<ProTechStack> proTechStackList) {
        this.proTechStackList = proTechStackList;
    }
    public void updateProFieldList(List<ProField> proFieldList) {
        this.proFieldList = proFieldList;
    }
    public void updateProPositionCrewList(List<ProPositionCrew> proPositionCrewList) {
        this.proPositionCrewList = proPositionCrewList;
    }
    public void updateProApplyCrewList(List<ProApplyCrew> proApplyCrewList) {
        this.proApplyCrewList = proApplyCrewList;
    }
    public void updateProAcceptedCrewList(List<ProAcceptedCrew> proAcceptedCrewList) {
        this.proAcceptedCrewList = proAcceptedCrewList;
    }
    public void updateDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public void updateStatus(String status) {
        this.status = status;
    }

    public void plusViews() {
        this.views += 1;
    }

    public void plusLikesTotal() {
        this.totalLikes += 1;
    }

    public void minusLikesTotal() {
        this.totalLikes -= 1;
    }
}

