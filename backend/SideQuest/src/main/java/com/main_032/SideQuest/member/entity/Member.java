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
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;

    @Column
    private String profileImageUrl;

    @Column
    private String position;

    @Column
    private int yearOfDev;

    @Column
    private int totalStar;

    @Column
    private String location;

    @OneToMany(mappedBy = "member")
    List<MemberTechStack> memberTechStackList;

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

    public void updateYearOfDev(int yearOfDev) {
        this.yearOfDev = yearOfDev;
    }

    public void updateProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void updatePhone(String phone) {
        this.phone = phone;
    }

    public void updateAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public void updatePosition(String position) {
        this.position = position;
    }

    public void updateLocation(String location) {
        this.location = location;
    }

    public boolean getDeleted() {
        return deleted;
    }

    public void plusStars(int star) {
        this.totalStar += star;
    }
}
