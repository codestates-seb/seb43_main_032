package com.main_032.SideQuest.member.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    public void updateId(Long id) {
        this.id = id;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateRoles(List<String> roles) {
        this.roles = roles;
    }
}
