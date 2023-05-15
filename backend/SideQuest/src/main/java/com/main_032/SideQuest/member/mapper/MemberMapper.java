package com.main_032.SideQuest.member.mapper;

import com.main_032.SideQuest.member.dto.GetMemberResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.dto.MemberTechStackResponseDto;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.entity.MemberTechStack;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        Member member = new Member();
        member.updateName(memberPostDto.getName());
        member.updateEmail(memberPostDto.getEmail());
        member.updatePassword(memberPostDto.getPassword());
        return member;
    }

    public GetMemberResponseDto memberToGetMemberResponseDto(Member member) {
        GetMemberResponseDto getMemberResponseDto = new GetMemberResponseDto(
                member.getName(),
                member.getEmail(),
                member.getPhone(),
                member.getPosition(),
                member.getAboutMe(),
                member.getProfileImageUrl(),
                member.getLocation(),
                member.getYearOfDev(),
                member.getTotalStar()
                );
        return getMemberResponseDto;
    }

}
