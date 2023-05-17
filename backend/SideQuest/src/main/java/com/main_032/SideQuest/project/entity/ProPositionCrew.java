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

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    Project project;

    @Column
    private String position;

    @Column
    private int number;

    @Column
    private int acceptedNumber;

    public ProPositionCrew(Project project, String position, int number) {
        this.project = project;
        this.position = position;
        this.number = number;
    }

    public void plusAcceptedNumber() {
        this.acceptedNumber += 1;
    }
}
