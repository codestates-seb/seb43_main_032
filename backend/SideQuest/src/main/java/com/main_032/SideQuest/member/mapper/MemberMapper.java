package com.main_032.SideQuest.member.mapper;

import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.project.repository.ProAcceptedCrewRepository;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberMapper {
    private final ProjectRepository projectRepository;
    private final ProAcceptedCrewRepository proAcceptedCrewRepository;

    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        Member member = new Member();
        member.updateName(memberPostDto.getName());
        member.updateEmail(memberPostDto.getEmail());
        member.updatePassword(memberPostDto.getPassword());
        return member;
    }

    public MemberGetResponseDto memberToGetMemberResponseDto(Member member) {
        int totalProject = 0;
        totalProject += projectRepository.findByMemberId(member.getId()).size();
        totalProject += proAcceptedCrewRepository.findByMemberId(member.getId()).size();
        MemberGetResponseDto memberGetResponseDto = new MemberGetResponseDto(
                member.getId(),
                member.getName(),
                member.getEmail(),
                member.getPhone(),
                member.getPosition(),
                member.getAboutMe(),
                member.getProfileImageUrl(),
                member.getLocation(),
                member.getYearOfDev(),
                member.getTotalStar(),
                totalProject
                );
        return memberGetResponseDto;
    }

}
