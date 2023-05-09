package com.main_032.SideQuest.domain.project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProAcceptedCrew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectAcceptedCrewId;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column
    private String position;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;


}
