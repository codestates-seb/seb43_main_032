package com.main_032.SideQuest.community.dto;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

import javax.persistence.Column;
@Getter
public class AnswerPostDto {
    private Category category;
    private Long projectId;
    private Long articleId;
    private String content;
}
