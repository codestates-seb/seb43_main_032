package com.main_032.SideQuest.article.service;

import com.main_032.SideQuest.article.dto.ArticlePatchDto;
import com.main_032.SideQuest.article.dto.ArticlePostDto;
import com.main_032.SideQuest.article.dto.ArticleResponseDto;
import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.mapper.ArticleMapper;
import com.main_032.SideQuest.article.repository.ArticleRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper mapper;
    private final MemberService memberService;
//    private final AnswerRepository answerRepository;


    public ArticleService(ArticleRepository articleRepository, ArticleMapper mapper, MemberService memberService) {
        this.articleRepository = articleRepository;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    public void createArticle(ArticlePostDto articlePostDto){
        Member member =memberService.getLoginMember();
        Article article = mapper.articlePostDtoToArticle(articlePostDto);
        article.updateMemberId(member.getId());
        articleRepository.save(article);
    }
    public ArticleResponseDto updateArticle(Long articleId,ArticlePatchDto articlePatchDto){
        //게시물 존재 여부 확인
        Optional<Article> findArticle = verifyExistArticle(articleId);
        //멤버 ID 매치 확인
        matchMemberID(findArticle);
        Article updateArticle = findArticle.get();
        updateArticle.updateTitle(articlePatchDto.getTitle());
        updateArticle.updateContent(articlePatchDto.getContent());
        updateArticle.updateCategory(articlePatchDto.getCategory());

        Article article = articleRepository.save(updateArticle);
        ArticleResponseDto articleResponseDto = mapper.articleToArticleResponseDto(article);
        return articleResponseDto;
    }
    public ArticleResponseDto getArticle(Long articleId){
        Optional<Article> findArticle=verifyExistArticle(articleId);
        Article article = findArticle.get();

        ArticleResponseDto response = mapper.articleToArticleResponseDto(article);
        return null;
    }
    public void findAllArticle(){
    }
    public void searchArticle(){

    }
    public void deleteArticle(){

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



}
