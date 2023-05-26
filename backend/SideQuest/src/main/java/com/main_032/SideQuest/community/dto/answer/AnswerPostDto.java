package com.main_032.SideQuest.community.dto.answer;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Getter
public class AnswerPostDto {
    @NotNull(message = "카테고리 입력하세요")
    private Category category;
    private Long uniteId;   //articleId,projectId
    private String content;
}