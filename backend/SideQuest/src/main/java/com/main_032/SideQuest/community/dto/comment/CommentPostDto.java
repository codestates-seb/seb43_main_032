package com.main_032.SideQuest.community.dto.comment;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

@Getter
public class CommentPostDto {
    private Category category;
    private Long uniteId; //articleId,projectId
    private String content;
}
