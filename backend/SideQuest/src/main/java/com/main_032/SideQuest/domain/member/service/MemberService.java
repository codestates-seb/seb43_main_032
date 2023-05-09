package com.main_032.SideQuest.domain.member.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.domain.member.dto.MemberPostDto;
import com.main_032.SideQuest.domain.member.mapper.MemberMapper;
import com.main_032.SideQuest.domain.member.repository.MemberRepository;
import com.main_032.SideQuest.global.exception.BusinessLogicException;
import com.main_032.SideQuest.global.exception.ExceptionCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberMapper memberMapper;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberMapper memberMapper, MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberMapper = memberMapper;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public void signup(MemberPostDto memberPostDto) {
        if(verifyExistEmail(memberPostDto.getEmail())) throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
        if(verifyExistName(memberPostDto.getName())) throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_EXISTS);

        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        memberRepository.save(member);
        return;
    }

    public boolean verifyExistEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        return findMember.isPresent();
    }

    public boolean verifyExistName(String name) {
        Optional<Member> findMember = memberRepository.findByName(name);
        return findMember.isPresent();
    }
}
