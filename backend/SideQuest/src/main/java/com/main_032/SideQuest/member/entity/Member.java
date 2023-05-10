package com.main_032.SideQuest.member.entity;

import com.main_032.SideQuest.article.entity.*;
import com.main_032.SideQuest.project.entity.Project;


import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String password;

    @Column
    private String phoneNumber;

    @Column
    private String aboutMe;

    @Column
    private String profileImageUrl;

    @Column
    private String position;

    @Column
    private int yearOfDev;

    @Column
    private int totalStar;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    @OneToMany(mappedBy = "member")
    private List<MemberTechStack> memberTechStackList = new ArrayList<>();

    @OneToMany(mappedBy = "memberGiver")
    private List<MemberEvaluation> memberEvaluationGiverList = new ArrayList<>();

    @OneToMany(mappedBy = "memberReceiver")
    private List<MemberEvaluation> memberEvaluationReceiverList = new ArrayList<>();
}
