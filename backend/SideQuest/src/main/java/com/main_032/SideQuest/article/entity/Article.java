package com.main_032.SideQuest.article.entity;

import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.util.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Article extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long memberId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private ArticleCategory category;

    @Column
    private int views;

    @Column
    private int totalLikes;

    @Column(columnDefinition = "TINYINT ")
    private boolean deleted;

    public void updateMemberId(Long memberId){
        this.memberId = memberId;
    }
    public void updateTitle(String title){
        this.title = title;
    }
    public void updateContent(String content){
        this.content = content;
    }
    public void updateCategory(ArticleCategory category){
        this.category = category;
    }
    public void updateDeleted(boolean deleted){this.deleted=deleted;}
    public void updateArticleViews(int views){this.views = views;}
    public void updateTotalLikes(int totalLikes){this.totalLikes = totalLikes;}
    public void delete(){this.deleted = true;}
    public void restore(){this.deleted = false;}

}
