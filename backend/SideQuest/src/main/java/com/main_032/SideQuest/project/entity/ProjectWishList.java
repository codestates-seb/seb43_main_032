package com.main_032.SideQuest.project.entity;
import com.main_032.SideQuest.member.entity.Member;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProjectWishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proWishListId;

    @ManyToOne
    @JoinColumn(name = "projectId", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
}