package com.main_032.SideQuest.member.service;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.entity.MemberTechStack;
import com.main_032.SideQuest.member.repository.MemberTechStackRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class MemberTechStackService {
    private final MemberTechStackRepository memberTechStackRepository;

    @Transactional
    public void updateMemberTechStack(List<String> memberTechStackList, Member member) {
        // 이미 존재하는 techStack 제거
        memberTechStackRepository.deleteByMemberId(member.getId());

        for (int i = 0; i < memberTechStackList.size(); i++) {
            MemberTechStack memberTechStack = new MemberTechStack();
            memberTechStack.updateTech(memberTechStackList.get(i));
            memberTechStack.updateMember(member);
            memberTechStackRepository.save(memberTechStack);
        }
        return;
    }

    public List<MemberTechStack> getMemberTechStackList(Long memberId) {
        List<MemberTechStack> memberTechStackList = memberTechStackRepository.findByMemberId(memberId);
        return memberTechStackList;
    }

    @Transactional
    public void delete(Member member) {
        List<MemberTechStack> memberTechStackList = member.getMemberTechStackList();
        for (int i = 0; i < memberTechStackList.size(); i++) {
            memberTechStackRepository.delete(memberTechStackList.get(i));
        }
    }
}
