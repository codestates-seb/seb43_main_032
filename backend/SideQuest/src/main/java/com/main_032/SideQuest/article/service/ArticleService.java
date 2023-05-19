package com.main_032.SideQuest.article.service;

import com.main_032.SideQuest.article.dto.*;
import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.entity.ArticleTechStack;
import com.main_032.SideQuest.article.mapper.ArticleMapper;
import com.main_032.SideQuest.article.repository.ArticleRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper mapper;
    private final MemberService memberService;
    private final ArticleTechStackService articleTechStackService;


    public ArticleService(ArticleRepository articleRepository, ArticleMapper mapper, MemberService memberService, ArticleTechStackService articleTechStackService) {
        this.articleRepository = articleRepository;
        this.mapper = mapper;
        this.memberService = memberService;
        this.articleTechStackService = articleTechStackService;
    }

    @Transactional
    public void createArticle(ArticlePostDto articlePostDto){
        Member member =memberService.getLoginMember();
        Article article = mapper.articlePostDtoToArticle(articlePostDto);
        article.updateMemberId(member.getId());
        article = articleRepository.save(article);
        articleTechStackService.updateArticleTechStack(articlePostDto.getTechList(), article.getId());
    }

    @Transactional
    public void updateArticle(Long articleId,ArticlePatchDto articlePatchDto){
        //게시물 존재 여부 확인
        Optional<Article> findArticle = verifyExistArticle(articleId);
        //멤버 ID 매치 확인
        matchMemberID(findArticle);
        Article updateArticle = findArticle.get();
        updateArticle.updateTitle(articlePatchDto.getTitle());
        updateArticle.updateContent(articlePatchDto.getContent());
        updateArticle.updateCategory(articlePatchDto.getCategory());
        articleTechStackService.updateArticleTechStack(articlePatchDto.getTechList(),updateArticle.getId());
        articleRepository.save(updateArticle);
    }

    @Transactional
    public SingleResponseDto<ArticleGetResponseDto> getArticle(Long articleId){
        Optional<Article> findArticle =verifyExistArticle(articleId);
        Article article = findArticle.get();

        article.updateArticleViews(article.getViews()+1);
        articleRepository.save(article);

        List<ArticleTechStack> articleTechStackList = articleTechStackService.getAllarticleTechStackList(article.getId());
        List<ArticleTechStackResponseDto> articleTechStackResponseDtoList =
                mapper.articleTechStackListToArticleTechStackResponseDtoList(articleTechStackList);
        ArticleGetResponseDto response = mapper.articleToArticleGetResponseDto(article,articleTechStackResponseDtoList);

        SingleResponseDto<ArticleGetResponseDto> singleResponseDto = new SingleResponseDto<ArticleGetResponseDto>(response);
        return singleResponseDto;
    }

    public MultiResponseDto<ArticleGetResponseDto> findAllArticle(int page, int size){
        Page<Article> articlePage = articleRepository.findAllArticlePage(PageRequest.of(page,size, Sort.by("id").descending()));
        List<Article> articleList = articlePage.getContent();
        List<ArticleGetResponseDto> articleResponseDtoList = new ArrayList<>();
        for(Article article:articleList){
            List<ArticleTechStack> articleTechStackList = articleTechStackService.getAllarticleTechStackList(article.getId());
            List<ArticleTechStackResponseDto> articleTechStackResponseDtoList =
                    mapper.articleTechStackListToArticleTechStackResponseDtoList(articleTechStackList);
            ArticleGetResponseDto response = mapper.articleToArticleGetResponseDto(article,articleTechStackResponseDtoList);
            articleResponseDtoList.add(response);
        }
        MultiResponseDto<ArticleGetResponseDto> multiResponseDto =new MultiResponseDto(articleResponseDtoList, articlePage);
        return multiResponseDto;
    }

    public MultiResponseDto<ArticleGetResponseDto> searchArticle(String searchWord,int page, int size){
        Page<Article> articlePage= articleRepository.findSearchListArticle(searchWord,PageRequest.of(page,size, Sort.by("id").descending()));
        List<Article> articleList = articlePage.getContent();
        List<ArticleGetResponseDto> articleResponseDtoList = new ArrayList<>();
        for(Article article:articleList){
            List<ArticleTechStack> articleTechStackList = articleTechStackService.getAllarticleTechStackList(article.getId());
            List<ArticleTechStackResponseDto> articleTechStackResponseDtoList =
                    mapper.articleTechStackListToArticleTechStackResponseDtoList(articleTechStackList);
            ArticleGetResponseDto response = mapper.articleToArticleGetResponseDto(article,articleTechStackResponseDtoList);
            articleResponseDtoList.add(response);
        }
        MultiResponseDto<ArticleGetResponseDto> multiResponseDto =new MultiResponseDto(articleResponseDtoList, articlePage);
        return multiResponseDto;
    }

    @Transactional
    public void deleteArticle(Long articleId){
        Optional<Article> findArticle = verifyExistArticle(articleId);
        matchMemberID(findArticle);
        Article deleteArticle = findArticle.get();
        deleteArticle.delete();
        articleRepository.save(deleteArticle);
    }

    private void matchMemberID(Optional<Article> findArticle) {
        Member member =memberService.getLoginMember();
        if(member.getId() != findArticle.get().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }

    private Optional<Article> verifyExistArticle(Long articleId) {
        Optional<Article> findArticle =articleRepository.findById(articleId);
        findArticle.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
        return findArticle;
    }

    public SingleResponseDto<ArticleViewsTop5Dto> getViewsTop5Articles() {
        Pageable pageable = PageRequest.of(0,5);
        List<Article> articleList = articleRepository.getTop5ViewsArticles(pageable);
        List<ArticleGetResponseDto> articleGetResponseDtoList= new ArrayList<>();

        for(Article article:articleList){
            List<ArticleTechStack> articleTechStackList = articleTechStackService.getAllarticleTechStackList(article.getId());
            List<ArticleTechStackResponseDto> articleTechStackResponseDtoList =
                    mapper.articleTechStackListToArticleTechStackResponseDtoList(articleTechStackList);
            ArticleGetResponseDto response = mapper.articleToArticleGetResponseDto(article,articleTechStackResponseDtoList);
            articleGetResponseDtoList.add(response);
        }
        ArticleViewsTop5Dto response = new ArticleViewsTop5Dto(articleGetResponseDtoList);
        return new SingleResponseDto<ArticleViewsTop5Dto>(response);
    }

    public SingleResponseDto<ArticleLikesTop5Dto> getLikesTop5Articles() {
        Pageable pageable = PageRequest.of(0,5);
        List<Article> articleList = articleRepository.getTop5LikesArticles(pageable);
        List<ArticleGetResponseDto> articleGetResponseDtoList= new ArrayList<>();

        for(Article article:articleList){
            List<ArticleTechStack> articleTechStackList = articleTechStackService.getAllarticleTechStackList(article.getId());
            List<ArticleTechStackResponseDto> articleTechStackResponseDtoList =
                    mapper.articleTechStackListToArticleTechStackResponseDtoList(articleTechStackList);
            ArticleGetResponseDto response = mapper.articleToArticleGetResponseDto(article,articleTechStackResponseDtoList);
            articleGetResponseDtoList.add(response);
        }
        ArticleLikesTop5Dto response = new ArticleLikesTop5Dto(articleGetResponseDtoList);
        return new SingleResponseDto<ArticleLikesTop5Dto>(response);
    }

    public Article getArticleById(Long articleId) {
        Optional<Article> findArticle = articleRepository.findById(articleId);
        findArticle.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
        return findArticle.get();
    }

    @Transactional
    public void plusTotalLikes(Long articleId) {
        Article article = getArticleById(articleId);
        article.plusTotalLikes();
        articleRepository.save(article);
    }

    @Transactional
    public void minusTotalLikes(Long articleId) {
        Article article = getArticleById(articleId);
        article.minusTotalLikes();
        articleRepository.save(article);
    }
}
