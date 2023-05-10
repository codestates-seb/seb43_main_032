package com.main_032.SideQuest.project.entity;

import com.main_032.SideQuest.member.entity.Member;
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