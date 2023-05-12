package com.main_032.SideQuest.member.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String tech;

    @Column
    private Long memberId;

    public void updateTech(String tech) {
        this.tech = tech;
    }

    public void updateMemberId(Long memberId) {
        this.memberId = memberId;
    }
}