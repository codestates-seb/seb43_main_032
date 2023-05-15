package com.main_032.SideQuest.community.entity.Mapper;

import com.main_032.SideQuest.community.entity.dto.LikesPostDto;
import com.main_032.SideQuest.community.entity.entity.Likes;

public class LikesMapper {
    public static Likes toEntity(LikesPostDto dto) {
        return new Likes(dto.getMemberId(), dto.getCategory(), dto.getCommentId());
    }
}