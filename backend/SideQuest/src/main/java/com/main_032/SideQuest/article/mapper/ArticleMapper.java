package com.main_032.SideQuest.article.mapper;

import com.main_032.SideQuest.article.dto.ArticlePostDto;
import com.main_032.SideQuest.article.dto.ArticleGetResponseDto;
import com.main_032.SideQuest.article.dto.ArticleTechStackResponseDto;
import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.entity.ArticleTechStack;
import com.main_032.SideQuest.article.service.ArticleTechStackService;
import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.repository.LikesRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class ArticleMapper {
    private final ArticleTechStackService articleTechStackService;
    private final MemberService memberService;
    private final LikesRepository likesRepository;

    public Article articlePostDtoToArticle(ArticlePostDto articlePostDto){
            Article article = new Article();
            article.updateTitle(articlePostDto.getTitle());
            article.updateContent(articlePostDto.getContent());
            article.updateCategory(articlePostDto.getCategory());
            articleTechStackService.updateArticleTechStack(articlePostDto.getTechList(), article.getId());
            return article;

    }

    public List<ArticleTechStackResponseDto> articleTechStackListToArticleTechStackResponseDtoList(List<ArticleTechStack> articleTechStackList){
        List<ArticleTechStackResponseDto> response = new ArrayList<>();
        for(ArticleTechStack articleTechStack: articleTechStackList){
            ArticleTechStackResponseDto articleTechStackResponseDto = new ArticleTechStackResponseDto(articleTechStack.getTech());
            response.add(articleTechStackResponseDto);
        }

        return response;
    }

    public ArticleGetResponseDto articleToArticleGetResponseDto(Article article, List<ArticleTechStackResponseDto> articleTechStackResponseDtoList){
        // 작성 여부, 좋아요 여부 확인
        boolean isLogin = memberService.isLoginMember();
        boolean isAuthor = false;
        boolean liked = false;
        if(isLogin == true) {
            Member loginMember = memberService.getLoginMember();

            if(article.getMemberId() == loginMember.getId()) isAuthor = true;

            Optional<Likes> findLikes = likesRepository.findByMemberIdAndCategoryAndArticleId(loginMember.getId(), Category.ARTICLE, article.getId());
            if(findLikes.isEmpty() == false) liked = true;
        }

        ArticleGetResponseDto articleResponseDto = new ArticleGetResponseDto(
                article.getId(),
                memberService.getMemberInfo(article.getMemberId()).getData(),
                article.getTitle(),
                article.getContent(),
                article.getCategory(),
                article.getViews(),
                article.getTotalLikes(),
                isAuthor,
                liked,
                article.getTotalAnswers(),
                article.getCreatedAt(),
                articleTechStackResponseDtoList
                );
            return articleResponseDto;
        }

}
