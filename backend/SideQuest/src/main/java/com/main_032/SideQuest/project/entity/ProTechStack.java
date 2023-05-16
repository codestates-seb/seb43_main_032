package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ProTechStack extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    Project project;

    @Column
    private String tech;

    public ProTechStack(Project project, String tech) {
        this.project = project;
        this.tech = tech;
    }
}
