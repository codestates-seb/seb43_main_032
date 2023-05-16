package com.main_032.SideQuest.community.dto.AnswerDto;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;


@Getter
public class AnswerPostDto {
    private Long memberId;
    private Category category;
    private Long projectId;
    private Long articleId;
    private String content;
}