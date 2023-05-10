package com.main_032.SideQuest.message.entity;

import com.main_032.SideQuest.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat")
@Getter
@Setter
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne
    @JoinColumn(name = "senderMemberId", nullable = false)
    private Member senderMember;

    @ManyToOne
    @JoinColumn(name = "receiverMemberId", nullable = false)
    private Member receiverMember;

    @Column
    private String title;

    @Column
    private String content;

    @Column(columnDefinition = "TINYINT")
    private boolean reading;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}
