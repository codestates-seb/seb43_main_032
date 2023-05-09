package com.main_032.SideQuest.domain.member.mapper;

import com.main_032.SideQuest.domain.member.dto.MemberPostDto;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        Member member = new Member();
        member.setName(memberPostDto.getName());
        member.setEmail(memberPostDto.getEmail());
        member.setPassword(memberPostDto.getPassword());
        return member;
    }
}
