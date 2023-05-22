package com.main_032.SideQuest.member.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import com.main_032.SideQuest.ouath2.domain.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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

    @Column
    private String location;

    /*JPA로 데이터베이스로 저장할 때 Enum 값을 어떤 형태로 저장할지를 결정 (기본 - int로 된 숫자)
숫자로 저장되면 데이터베이스로 확인할 때 무슨 코드를 의미하는지 알 수 없으므로 문자열로 저장될 수 있도록 선언하자.*/
    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

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
    public String getRoleKey() {
        return this.role.getKey();
    }

    @Builder
    public Member(String email, String name, String password,
                  String phone, String aboutMe, String profileImageUrl,
                  String position, int yearOfDev, int totalStar,
                  String location, Role role,
                  List<MemberTechStack> memberTechStackList,
                  List<String> roles, boolean deleted) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.aboutMe = aboutMe;
        this.profileImageUrl = profileImageUrl;
        this.position = position;
        this.yearOfDev = yearOfDev;
        this.totalStar = totalStar;
        this.location = location;
        this.role = role;
        this.memberTechStackList = memberTechStackList;
        this.roles = roles;
        this.deleted = deleted;
    }
    public Member update(String name) {
        this.name = name;
        return this;
    }
}
