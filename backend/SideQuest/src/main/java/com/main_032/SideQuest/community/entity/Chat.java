package com.main_032.SideQuest.community.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "chat")
@Getter
public class Chat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long senderMemberId;

    @Column
    private Long receiverMemberId;

    @Column
    private String title;

    @Column
    private String content;

    @Column(columnDefinition = "TINYINT")
    private boolean reading;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;
}
