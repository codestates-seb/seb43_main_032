package com.main_032.SideQuest.community.dto.AnswerDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private String name;
    private int star;
    private int totalLikes;
    private String content;
    private LocalDateTime createAt;
//    private List<CommentResponseDto> commentResponseDtoList;

}