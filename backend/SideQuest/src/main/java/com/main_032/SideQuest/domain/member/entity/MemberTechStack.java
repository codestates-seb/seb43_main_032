package com.main_032.SideQuest.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MemberTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberTechStackId;

    @Column
    private String tech;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID", referencedColumnName = "MEMBER_ID")
    private Member member;
}