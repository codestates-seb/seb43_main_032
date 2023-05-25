package com.main_032.SideQuest.community.dto.answer;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

import javax.validation.constraints.NotBlank;


@Getter
public class AnswerPostDto {
    @NotBlank
    private Category category;
    private Long uniteId;   //articleId,projectId
    private String content;
}