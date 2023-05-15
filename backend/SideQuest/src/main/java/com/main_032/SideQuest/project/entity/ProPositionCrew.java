package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ProPositionCrew extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long projectId;

    @Column
    private String position;

    @Column
    private int number;

    @Column
    private int AcceptedNumber;

    public ProPositionCrew(Long projectId, String position) {
        this.projectId = projectId;
        this.position = position;
    }
}
