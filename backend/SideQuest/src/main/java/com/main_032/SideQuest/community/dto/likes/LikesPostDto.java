package com.main_032.SideQuest.community.dto.likes;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;


@Getter
public class LikesPostDto {
    private Category category;
    private Long uniteId;
}