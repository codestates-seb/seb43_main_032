package com.main_032.SideQuest.community.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private String name;
    private int star;
    private int totalLikes;
    private String content;
//    private List<CommentResponseDto> commentResponseDtoList;

}
