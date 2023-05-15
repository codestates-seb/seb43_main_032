package com.main_032.SideQuest.community.entity.dto;

import com.main_032.SideQuest.community.entity.entity.Category;
import lombok.Getter;


@Getter
public class LikesPostDto {
    private Long memberId;
    private Category category;
    private Long commentId;
}