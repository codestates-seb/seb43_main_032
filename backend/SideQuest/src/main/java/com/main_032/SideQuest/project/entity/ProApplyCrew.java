package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class ProApplyCrew extends BaseEntity {
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

    @Column
    private String title;

    @Column
    private String content;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}
