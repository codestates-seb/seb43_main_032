package com.main_032.SideQuest.project.dto;

import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProApplyCrewResponseDto {
    private Long projectId;
    private String position;
    private MemberGetResponseDto memberInfo;
}
