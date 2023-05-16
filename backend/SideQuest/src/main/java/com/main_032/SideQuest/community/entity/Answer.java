package com.main_032.SideQuest.community.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
// 답글
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

    @OneToMany
    private List<Comment> commentList =new ArrayList<>();

    @Column(columnDefinition = "TINYINT")
    private boolean deleted;

    public void updateCategory(Category category){this.category = category;}
    public void updateMemberId(Long memberId){this.memberId = memberId;}
    public void updateProjectId(Long projectId){this.projectId = projectId;}
    public void updateArticleId(Long articleId){this.articleId = articleId;}
    public void updateContent(String content){this.content = content;}

    public void updateDeleted(boolean deleted){this.deleted = deleted;}
    public void delete(){this.deleted = true;}
    public void restore(){this.deleted = false;}

}
