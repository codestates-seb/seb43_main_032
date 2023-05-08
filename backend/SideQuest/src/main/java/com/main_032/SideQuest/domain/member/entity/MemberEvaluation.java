package com.main_032.SideQuest.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class MemberEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long memberEvaluationId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_GIVER_ID")
    private Member memberGiver;

    @ManyToOne
    @JoinColumn(name = "MEMBER_RECEIVER_ID")
    private Member memberReceiver;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID", referencedColumnName = "PROJECT_ID")
    private Project project;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private int star;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}