package com.main_032.SideQuest.member.mapper;

import com.main_032.SideQuest.member.dto.GetLoginMemberResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.entity.MemberTechStack;
import org.springframework.stereotype.Component;

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

    public GetLoginMemberResponseDto memberToSingleResponseDto(Member member, List<MemberTechStack> memberTechStack) {
        GetLoginMemberResponseDto getLoginMemberResponseDto = new GetLoginMemberResponseDto(
                member.getName(),
                member.getEmail(),
                member.getPhoneNumber(),
                member.getPosition(),
                member.getAboutMe(),
                member.getProfileImageUrl(),
                member.getYearOfDev(),
                member.getTotalStar(),
                memberTechStack
        );

        return getLoginMemberResponseDto;
    }
}
