package com.main_032.SideQuest.project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectFieldId;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Column
    private String field;


}
