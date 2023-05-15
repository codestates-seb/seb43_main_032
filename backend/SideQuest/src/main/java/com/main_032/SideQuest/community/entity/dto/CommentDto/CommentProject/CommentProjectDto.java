package com.main_032.SideQuest.community.entity.dto.CommentDto.CommentProject;

import com.main_032.SideQuest.community.entity.dto.CommentDto.CommenntAriticle.CommentArticleDto;
import com.main_032.SideQuest.community.entity.entity.Category;
import com.main_032.SideQuest.community.entity.entity.Comment;
import lombok.Getter;

@Getter
public class CommentProjectDto {
    private Long id;
    private Long memberId;
    private Category category;
    private String content;
    private int totalLikes;
    private Long projectId;
    private boolean deleted;

    // CommentProjectDto 생성자나 필요한 메소드가 있다면 여기에 추가하세요.

    public CommentProjectDto(
            Long id,
            Long memberId,
            Category category,
            String content,
            int totalLikes,
            Long projectId,
            boolean deleted) {
        this.id = id;
        this.memberId = memberId;
        this.category = category;
        this.content = content;
        this.totalLikes = totalLikes;
        this.projectId = projectId;
        this.deleted = deleted;
    }
    public static CommentProjectDto from(Comment comment) {
        return new CommentProjectDto(
                comment.getId(),
                comment.getMemberId(),
                comment.getCategory(),
                comment.getContent(),
                comment.getTotalLikes(),
                comment.getArticle().getId(),
                comment.isDeleted()
        );
    }
}