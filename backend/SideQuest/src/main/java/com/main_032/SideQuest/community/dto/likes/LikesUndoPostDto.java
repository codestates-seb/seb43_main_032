package com.main_032.SideQuest.community.dto.likes;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Getter
public class LikesUndoPostDto {
    @NotBlank(message = "카테고리 입력하세요")
    private Category category;
    private Long uniteId;
}
