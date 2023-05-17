package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ProAcceptedCrew extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Column
    private Long memberId;

    @Column
    private String position;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    public ProAcceptedCrew(Project project, Long memberId, String position) {
        this.project = project;
        this.memberId = memberId;
        this.position = position;
    }

    public void updateProject(Project project) {
        this.project = project;
    }

    public void updateMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void updatePosition(String position) {
        this.position = position;
    }
}
