package com.main_032.SideQuest.community.dto.likes;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LikesResponseDto {
    private int totalLikes;
    private boolean liked;
}
