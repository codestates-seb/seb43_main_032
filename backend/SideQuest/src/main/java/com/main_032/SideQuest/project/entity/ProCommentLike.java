package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.member.entity.Member;
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