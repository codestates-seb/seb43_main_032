package com.main_032.SideQuest.article.mapper;

import com.main_032.SideQuest.article.dto.ArticlePostDto;
import com.main_032.SideQuest.article.dto.ArticleGetResponseDto;
import com.main_032.SideQuest.article.dto.ArticleResponseDto;
import com.main_032.SideQuest.article.dto.ArticleTechStackResponseDto;
import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.entity.ArticleTechStack;
import com.main_032.SideQuest.article.service.ArticleTechStackService;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ArticleMapper {
    private final ArticleTechStackService articleTechStackService;
    private final MemberRepository memberRepository;

    public ArticleMapper(ArticleTechStackService articleTechStackService, MemberRepository memberRepository) {
        this.articleTechStackService = articleTechStackService;
        this.memberRepository = memberRepository;
    }

    public Article articlePostDtoToArticle(ArticlePostDto articlePostDto){
            Article article = new Article();
            article.updateTitle(articlePostDto.getTitle());
            article.updateContent(articlePostDto.getContent());
            article.updateCategory(articlePostDto.getArticleCategory());
            articleTechStackService.updateArticleTechStack(articlePostDto.getArticleTechStackList(), article.getId());
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
        Optional<Member> findMember = memberRepository.findById(article.getMemberId());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        ArticleGetResponseDto articleResponseDto = new ArticleGetResponseDto(
                article.getId(),
                member.getName(),
                member.getProfileImageUrl(),
                member.getTotalStar(),
                article.getTitle(),
                article.getContent(),
                article.getCategory(),
                article.getViews(),
                article.getTotalLikes(),
                articleTechStackResponseDtoList
                );
            return articleResponseDto;
        }

//        public List<ArticleResponseDto> articleListToArticleResponseDtoList(List<Article> articleList){
//            List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();
//            for (int i = 0; i < articleList.size(); i++) {
//                ArticleResponseDto articleResponseDto = articleToArticleResponseDto(articleList.get(i));
//                articleResponseDtoList.add(articleResponseDto);
//            }
//            return articleResponseDtoList;
//        }
        public ArticleResponseDto articleToArticleResponseDto(Article article,List<ArticleTechStackResponseDto> articleTechStackResponseDtoList){
            ArticleResponseDto articleResponseDto = new ArticleResponseDto(
                    article.getId(),
                    article.getTitle(),
                    article.getContent(),
                    article.getViews(),
                    articleTechStackResponseDtoList
            );
            return articleResponseDto;
        }
}
