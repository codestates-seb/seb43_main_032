package com.main_032.SideQuest.community.dto.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AnswerInfoResponseDto {
    private Long answerId;
    private Long memberId;
    private Long uniteId;
    private String content;
    private int totalLikes;
    private LocalDateTime createdAt;
}
