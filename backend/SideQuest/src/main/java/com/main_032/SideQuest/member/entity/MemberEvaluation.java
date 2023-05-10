package com.main_032.SideQuest.member.entity;

import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class MemberEvaluation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_GIVER_ID")
    private Member memberGiver;

    @ManyToOne
    @JoinColumn(name = "MEMBER_RECEIVER_ID")
    private Member memberReceiver;

    @Column
    private Long projectId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private int star;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}