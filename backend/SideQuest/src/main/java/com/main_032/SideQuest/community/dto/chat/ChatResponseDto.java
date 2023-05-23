package com.main_032.SideQuest.community.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ChatResponseDto {
    private Long senderMemberId;
    private Long receiverMemberId;
    private String email;
    private String name;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
