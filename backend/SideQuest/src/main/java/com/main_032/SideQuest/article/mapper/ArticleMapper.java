package com.main_032.SideQuest.article.mapper;

import com.main_032.SideQuest.article.dto.ArticlePatchDto;
import com.main_032.SideQuest.article.dto.ArticlePostDto;
import com.main_032.SideQuest.article.dto.ArticleResponseDto;
import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.community.entity.Answer;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ArticleMapper {
        public Article articlePostDtoToArticle(ArticlePostDto articlePostDto){
            Article article = new Article();
            article.updateTitle(articlePostDto.getTitle());
            article.updateContent(articlePostDto.getContent());
            article.updateCategory(articlePostDto.getArticleCategory());
            return article;
        }
        public ArticleResponseDto articleToArticleResponseDto(Article article){
            ArticleResponseDto articleResponseDto = new ArticleResponseDto(article.getId(), article.getTitle(), article.getMemberId(), article.getContent(),
                    article.getCategory(),article.getViews(),article.getTotalLikes(),article.getArticleTechStackList());
            return articleResponseDto;
        }
}
