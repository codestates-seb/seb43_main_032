package com.main_032.SideQuest.community.dto.answer;

import com.main_032.SideQuest.community.dto.comment.CommentResponseDto;
import com.main_032.SideQuest.member.dto.MemberGetResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private MemberGetResponseDto memberInfo;
    private Long answerId;
    private Long uniteId;
    private int totalLikes;
    private String content;
    private boolean isAuthor;
    private boolean liked;
    private LocalDateTime createdAt;
    private List<CommentResponseDto> commentList;
}