package com.main_032.SideQuest.domain.project.entity;

import com.main_032.SideQuest.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProCommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proCommentLikeId;

    @ManyToOne
    @JoinColumn(name = "proCommentId", nullable = false)
    private ProComment proComment;

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
}