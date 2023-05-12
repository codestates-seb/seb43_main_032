package com.main_032.SideQuest.member.mapper;

import com.main_032.SideQuest.member.dto.GetLoginMemberResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.dto.MemberTechStackPostResponseDto;
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

    public List<MemberTechStackPostResponseDto> memberTechStackListToMemberTechStackPostResponseDto(List<MemberTechStack> memberTechStackList) {
        List<MemberTechStackPostResponseDto> memberTechStackPostResponseDtoList = new ArrayList<>();
        for (int i = 0; i < memberTechStackList.size(); i++) {
            MemberTechStackPostResponseDto memberTechStackPostResponseDto = new MemberTechStackPostResponseDto(memberTechStackList.get(i).getTech());
            memberTechStackPostResponseDtoList.add(memberTechStackPostResponseDto);
        }

        return memberTechStackPostResponseDtoList;
    }

    public SingleResponseDto<GetLoginMemberResponseDto> memberToSingleResponseDto(Member member, List<MemberTechStackPostResponseDto> memberTechStackPostResponseDtoList) {
        GetLoginMemberResponseDto getLoginMemberResponseDto = new GetLoginMemberResponseDto(
                member.getName(),
                member.getEmail(),
                member.getPhoneNumber(),
                member.getPosition(),
                member.getAboutMe(),
                member.getProfileImageUrl(),
                member.getYearOfDev(),
                member.getTotalStar(),
                memberTechStackPostResponseDtoList
        );
        SingleResponseDto<GetLoginMemberResponseDto> singleResponseDto = new SingleResponseDto(getLoginMemberResponseDto);
        return singleResponseDto;
    }
}
