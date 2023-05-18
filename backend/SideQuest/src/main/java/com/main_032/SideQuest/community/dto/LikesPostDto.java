package com.main_032.SideQuest.community.dto;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;


@Getter
public class LikesPostDto {
    private Long memberId;
    private Category category;
    private Long uniteId;
}