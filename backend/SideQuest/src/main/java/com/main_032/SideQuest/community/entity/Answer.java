package com.main_032.SideQuest.community.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column
//    private Category category;

    @Column
    private Long memberId;

    @Column
    private Long projectId;

    @Column
    private Long articleId;

    @Column
    private String content;

    @Column
    private int totalLikes;

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    @OneToMany(mappedBy = "answer")
    private List<Comment> commentList = new ArrayList<>();


}
