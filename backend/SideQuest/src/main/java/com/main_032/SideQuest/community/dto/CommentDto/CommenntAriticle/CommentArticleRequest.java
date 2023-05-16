package com.main_032.SideQuest.community.dto.CommentDto.CommenntAriticle;

import com.main_032.SideQuest.community.entity.Category;
import lombok.Getter;

@Getter
public class CommentArticleRequest {
    private Long memberId;
    private Category category;
    private String content;
    private int totalLikes;
    private Long articleId; //assuming there's an articleId in Article entity
    private boolean deleted;

    // CommentArticleRequest 생성자나 필요한 메소드가 있다면 여기에 추가하세요.

    public CommentArticleRequest(
            Long memberId,
            Category category,
            String content,
            int totalLikes,
            Long articleId,
            boolean deleted) {
        this.memberId = memberId;
        this.category = category;
        this.content = content;
        this.totalLikes = totalLikes;
        this.articleId = articleId;
        this.deleted = deleted;
    }
}