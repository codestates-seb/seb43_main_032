package com.main_032.SideQuest.community.dto.likes;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

import javax.validation.constraints.NotBlank;


@Getter
public class LikesPostDto {
    @NotBlank
    private Category category;
    private Long uniteId;
}