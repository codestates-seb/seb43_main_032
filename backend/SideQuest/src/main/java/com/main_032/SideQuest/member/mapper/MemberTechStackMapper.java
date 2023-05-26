package com.main_032.SideQuest.member.mapper;

import com.main_032.SideQuest.member.dto.MemberTechStackResponseDto;
import com.main_032.SideQuest.member.entity.MemberTechStack;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberTechStackMapper {
    public List<MemberTechStackResponseDto> memberTechStackListToMemberTechStackResponseDtoList(List<MemberTechStack> memberTechStackList) {
        List<MemberTechStackResponseDto> memberTechStackResponseDtoList = new ArrayList<>();
        for (int i = 0; i < memberTechStackList.size(); i++) {
            MemberTechStackResponseDto memberTechStackResponseDto = new MemberTechStackResponseDto(memberTechStackList.get(i).getTech());
            memberTechStackResponseDtoList.add(memberTechStackResponseDto);
        }
        return memberTechStackResponseDtoList;
    }
}
