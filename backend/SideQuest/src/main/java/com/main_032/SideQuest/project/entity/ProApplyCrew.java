package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ProApplyCrew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectApplyCrewId;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @ManyToOne
    @JoinColumn(name= "MEMBER_ID")
    private Member member;

    @Column
    private String position;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;



}
