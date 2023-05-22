package com.main_032.SideQuest.auth.config.dto;

import com.main_032.SideQuest.member.entity.Member;
import lombok.Getter;
import org.springframework.security.core.parameters.P;

import java.io.Serializable;
@Getter
public class SessionMember implements Serializable {
    private String name;
    private String email;

    public SessionMember(Member member) {
        this.name = member.getName();
        this.email = member.getEmail();
    }
}
