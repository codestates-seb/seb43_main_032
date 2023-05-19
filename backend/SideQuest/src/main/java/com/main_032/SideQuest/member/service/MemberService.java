package com.main_032.SideQuest.member.service;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.auth.utils.GetAuthUserUtils;
import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import com.main_032.SideQuest.member.dto.MemberPatchDto;
import com.main_032.SideQuest.member.dto.MemberPostDto;
import com.main_032.SideQuest.member.dto.MemberTechStackResponseDto;
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
    public boolean isLoginMember(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")){
            return true;
        }
        return false;
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
}
