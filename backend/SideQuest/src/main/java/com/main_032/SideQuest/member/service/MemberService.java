package com.main_032.SideQuest.member.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.auth.utils.GetAuthUserUtils;
import com.main_032.SideQuest.member.dto.*;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.mapper.MemberMapper;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MemberService {
    private final MemberMapper memberMapper;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberTechStackService memberTechStackService;

    @Transactional
    public void signup(MemberPostDto memberPostDto) {
        if (verifyExistEmail(memberPostDto.getEmail()))
            throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
        if (verifyExistName(memberPostDto.getName()))
            throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_EXISTS);

        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.updatePassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.updateRoles(roles);
        member = memberRepository.save(member);
        Long num = member.getId() % 10;
        if(num == 0) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/d654f2fe-5f35-467c-96cb-6f5cf3dbd048");
        else if(num == 1) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/9eb8d8c3-1026-4b8f-a4a7-346e9baded60");
        else if(num == 2) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/4dcde4c8-5c43-4cd4-9bc7-80c55655277b");
        else if(num == 3) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/adfbebdf-b753-468f-a608-17eb97d5f718");
        else if(num == 4) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/a4d428d9-0469-44de-a40d-215f786ab3b8");
        else if(num == 5) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/d92942b9-a621-4a57-918b-8ee9622778d2");
        else if(num == 6) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/657e7258-189a-4832-9b96-25a0c4b9dc5d");
        else if(num == 7) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/4375f19d-0d8b-4fc4-b8cf-2158dc554870");
        else if(num == 8) member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/eda3ece7-a13b-4b5d-a784-371b9aa86c55");
        else member.updateProfileImageUrl("https://github.com/codestates-seb/seb43_main_032/assets/118104644/ad6bcb4c-bb23-4b35-ad4b-0503d6c74c91");

//        memberRepository.save(member);
        return;
    }

    public SingleResponseDto<MemberGetResponseDto> getLoginMemberInfo() {
        Member member = getLoginMember();
        MemberGetResponseDto memberGetResponseDto = memberMapper.memberToGetMemberResponseDto(member);
        List<MemberTechStackResponseDto> memberTechStackResponseDtoList = memberTechStackService.getMemberTechStackResponseDto(member);
        memberGetResponseDto.updateMemberTechStackResponseDtoList(memberTechStackResponseDtoList);
        SingleResponseDto<MemberGetResponseDto> singleResponseDto = new SingleResponseDto<>(memberGetResponseDto);
        return singleResponseDto;
    }

    @Transactional
    public void updateMember(MemberPatchDto memberPatchDto) {
        Member member = getLoginMember();
        member.updateName(memberPatchDto.getName());
        member.updateYearOfDev(memberPatchDto.getYearOfDev());
        member.updatePosition(memberPatchDto.getPosition());
        member.updatePhone(memberPatchDto.getPhone());
        member.updateAboutMe(memberPatchDto.getAboutMe());
        member.updateProfileImageUrl(memberPatchDto.getProfileImageUrl());
        member.updateLocation(memberPatchDto.getLocation());
        memberTechStackService.updateMemberTechStack(memberPatchDto.getTechList(), member);
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

    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        return member;
    }

    public boolean isLoginMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")) {
            return false;
        }
        return true;
    }

    public MultiResponseDto<MemberGetResponseDto> getAllMembers(int page, int size) {
        Page<Member> memberPage = memberRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        List<Member> memberList = memberPage.getContent();
        List<MemberGetResponseDto> memberGetResponseDtoList = new ArrayList<>();
        for (int i = 0; i < memberList.size(); i++) {
            MemberGetResponseDto memberGetResponseDto = memberMapper.memberToGetMemberResponseDto(memberList.get(i));
            List<MemberTechStackResponseDto> memberTechStackResponseDtoList = memberTechStackService.getMemberTechStackResponseDto(memberList.get(i));
            memberGetResponseDto.updateMemberTechStackResponseDtoList(memberTechStackResponseDtoList);
            memberGetResponseDtoList.add(memberGetResponseDto);
        }
        MultiResponseDto<MemberGetResponseDto> multiResponseDto = new MultiResponseDto<>(memberGetResponseDtoList, memberPage);
        return multiResponseDto;
    }

    public SingleResponseDto<MemberGetResponseDto> getMemberInfo(Long memberId) {
        Member member = getMember(memberId);

        MemberGetResponseDto memberGetResponseDto = memberMapper.memberToGetMemberResponseDto(member);
        List<MemberTechStackResponseDto> memberTechStackResponseDtoList = memberTechStackService.getMemberTechStackResponseDto(member);
        memberGetResponseDto.updateMemberTechStackResponseDtoList(memberTechStackResponseDtoList);
        SingleResponseDto<MemberGetResponseDto> singleResponseDto = new SingleResponseDto<>(memberGetResponseDto);
        return singleResponseDto;
    }

    public Member getMember(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        return member;
    }

    @Transactional
    public void deleteMember() {
        Member member = getLoginMember();
        // 멤버는 탈퇴할 때 deleted를 쓰지 않고 데이터베이스에서 삭제해 버린다.
//        member.updateDeleted(true);
//        memberRepository.save(member);
        memberTechStackService.delete(member);
        memberRepository.delete(member);
        return;
    }

    public MemberGetResponseDto getMemberGetResponseDto(Long memberId) {
        Member member = getMember(memberId);
        MemberGetResponseDto memberGetResponseDto = memberMapper.memberToGetMemberResponseDto(member);
        return memberGetResponseDto;
    }

    @Transactional
    public void plusStar(StarPostDto starPostDto) {
        Member member = getMember(starPostDto.getMemberId());
        member.plusStars(starPostDto.getStar());
        memberRepository.save(member);
        return;
    }
}
