package com.main_032.SideQuest.community.Mapper;

import com.main_032.SideQuest.community.dto.LikesPostDto;
import com.main_032.SideQuest.community.entity.Likes;

public class LikesMapper {
    public static Likes toEntity(LikesPostDto dto) {
        return new Likes(dto.getMemberId(), dto.getCategory(), dto.getCommentId());
    }
}