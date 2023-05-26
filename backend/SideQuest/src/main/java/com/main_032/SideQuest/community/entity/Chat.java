package com.main_032.SideQuest.community.entity;

import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "chat")
@Getter
@NoArgsConstructor
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

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TINYINT")
    private boolean reading;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    public void updatesenderMemberId(Long senderMemberId){this.senderMemberId = senderMemberId;}
    public void updatereceiverMemberId(Long receiverMemberId){this.receiverMemberId = receiverMemberId;}
    public void updatetitle(String title){this.title = title;}
    public void updatecontent(String content){this.content = content;}
    public void readMessage(){this.reading = true;}
    public void delete(){this.deleted = true;}
}
