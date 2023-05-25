package com.main_032.SideQuest.community.dto.comment;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CommentPostDto {
    @NotBlank
    private Category category;
    private Long uniteId; //articleId,projectId
    private String content;
}
