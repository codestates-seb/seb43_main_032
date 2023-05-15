package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ProField extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    Project project;

    @Column
    private String field;

    public ProField(Project project, String field) {
        this.project = project;
        this.field = field;
    }
}
