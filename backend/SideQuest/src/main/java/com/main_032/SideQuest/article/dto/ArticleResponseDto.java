package com.main_032.SideQuest.article.dto;

import com.main_032.SideQuest.article.entity.ArticleCategory;
import com.main_032.SideQuest.article.entity.ArticleTechStack;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.community.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
@Getter
@AllArgsConstructor
public class ArticleResponseDto {
    private Long id;
    private String title;
    private Long memberId; //Member.name,imageURL,star 빼오기용
    private String content;
    private ArticleCategory category;
    private int view;
    private int totalLikes;
    private List<ArticleTechStack> articleTechStackList;//아마 태그인거같음. 스택
//    private List<Answer> answerList;//답변

}
