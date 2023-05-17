package com.main_032.SideQuest.community.dto.AnswerDto;

import com.main_032.SideQuest.community.dto.CommentDto.CommentResponseDto;
import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private MemberGetResponseDto memberGetResponseDto;
    private int totalLikes;
    private String content;
    private LocalDateTime createAt;
    private List<CommentResponseDto> commentResponseDtoList;

}