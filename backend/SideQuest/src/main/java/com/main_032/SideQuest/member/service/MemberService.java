package com.main_032.SideQuest.member.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.auth.utils.GetAuthUserUtils;
import com.main_032.SideQuest.member.dto.GetLoginMemberResponseDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.entity.MemberTechStack;
import com.main_032.SideQuest.member.mapper.MemberMapper;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.repository.MemberTechStackRepository;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MemberService {
    private final MemberMapper memberMapper;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberTechStackRepository memberTechStackRepository;


    public void signup(MemberPostDto memberPostDto) {
        if(verifyExistEmail(memberPostDto.getEmail())) throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
        if(verifyExistName(memberPostDto.getName())) throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_EXISTS);

        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.updatePassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.updateRoles(roles);
        memberRepository.save(member);
        return;
    }

    public GetLoginMemberResponseDto getLoginMemberInfo() {
        Member member = getLoginMember();
        List<MemberTechStack> memberTechStackList = getMemberTechStack(member.getId());
        GetLoginMemberResponseDto getLoginMemberResponseDto = memberMapper.memberToSingleResponseDto(member, memberTechStackList);
        return getLoginMemberResponseDto;
    }

    public boolean verifyExistEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        return findMember.isPresent();
    }

    public boolean verifyExistName(String name) {
        Optional<Member> findMember = memberRepository.findByName(name);
        return findMember.isPresent();
    }

    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        return member;
    }

    public List<MemberTechStack> getMemberTechStack(Long memberId) {
        List<MemberTechStack> memberTechStackList = memberTechStackRepository.findByMemberId(memberId);
        return memberTechStackList;
    }
}
