package com.main_032.SideQuest.domain.project.entity;

import com.main_032.SideQuest.domain.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProAnswerLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proAnswerLikeId;

    @ManyToOne
    @JoinColumn(name = "proAnswerId", nullable = false)
    private ProAnswer proAnswer;

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
}