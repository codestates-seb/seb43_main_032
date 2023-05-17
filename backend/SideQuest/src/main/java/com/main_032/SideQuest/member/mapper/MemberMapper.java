package com.main_032.SideQuest.member.mapper;

import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        Member member = new Member();
        member.updateName(memberPostDto.getName());
        member.updateEmail(memberPostDto.getEmail());
        member.updatePassword(memberPostDto.getPassword());
        return member;
    }

    public MemberGetResponseDto memberToGetMemberResponseDto(Member member) {
        MemberGetResponseDto memberGetResponseDto = new MemberGetResponseDto(
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
        return memberGetResponseDto;
    }

}
