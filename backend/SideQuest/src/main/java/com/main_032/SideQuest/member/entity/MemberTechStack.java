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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    Member member;

    public void updateTech(String tech) {
        this.tech = tech;
    }

    public void updateMember(Member member) {
        this.member = member;
    }
}