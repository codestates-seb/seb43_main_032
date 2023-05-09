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

    // jpa 에서 양방향 연관관계의 문제점, 혹은 과도한 연관관계의 문제점을 학습해보는것이 좋겠다.
    // 연관관계를 설정한다는것은 강결합을 유도하기 떄문에, 서로 라이프 사이클이 같은 경우에 연관관계를 맺는것이 좋다.
    // 해당 부분은 추가 학습이 꼭 필요할듯
}
