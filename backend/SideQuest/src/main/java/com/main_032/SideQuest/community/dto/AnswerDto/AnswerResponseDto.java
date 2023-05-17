package com.main_032.SideQuest.community.dto.AnswerDto;

import com.main_032.SideQuest.community.dto.CommentDto.CommentResponseDto;
import com.main_032.SideQuest.member.dto.GetMemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private GetMemberResponseDto getMemberResponseDto;
    private int totalLikes;
    private String content;
    private LocalDateTime createAt;
    private List<CommentResponseDto> commentResponseDtoList;

}