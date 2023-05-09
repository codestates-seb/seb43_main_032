package com.main_032.SideQuest.domain.member.entity;

import com.main_032.SideQuest.domain.project.entity.Project;
import com.main_032.SideQuest.domain.article.entity.*;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

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

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    @OneToMany(mappedBy = "member")
    private List<MemberTechStack> memberTechStackList = new ArrayList<>();

    @OneToMany(mappedBy = "memberGiver")
    private List<MemberEvaluation> memberEvaluationGiverList = new ArrayList<>();

    @OneToMany(mappedBy = "memberReceiver")
    private List<MemberEvaluation> memberEvaluationReceiverList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Project> projectList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Article> articleList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ArticleAnswer> articleAnswerList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ArticleAnswerLike> articleAnswerLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ArticleComment> articleCommentList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ArticleCommentLike> articleCommentLikeList = new ArrayList<>();
}
