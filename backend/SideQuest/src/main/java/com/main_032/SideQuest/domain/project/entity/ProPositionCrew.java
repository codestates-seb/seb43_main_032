package com.main_032.SideQuest.domain.project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProPositionCrew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectPositionCrewId;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Column
    private String position;

    @Column
    private int number;

    @Column
    private int AcceptedNumber;


}
