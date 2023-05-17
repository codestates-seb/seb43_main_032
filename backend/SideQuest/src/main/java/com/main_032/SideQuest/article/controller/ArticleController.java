package com.main_032.SideQuest.article.controller;

import com.main_032.SideQuest.article.dto.*;
import com.main_032.SideQuest.article.service.ArticleService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = "article",description = "게시판 API")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }
    //게시글 작성
    @ApiOperation(value = "게시글 작성")
    @PostMapping("/article/post")
    public ResponseEntity<Void> postArticle(@RequestBody ArticlePostDto articlePostDto){
        articleService.createArticle(articlePostDto);
        return ResponseEntity.ok().build();
    }
    //게시글 수정
    @ApiOperation(value = "게시글 수정")
    @PatchMapping("/article/update/{article-id}")
    public ResponseEntity<Void> patchArticle(@PathVariable("article-id") Long articleId,
                                                           @RequestBody ArticlePatchDto articlePatchDto){
        articleService.updateArticle(articleId,articlePatchDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    //게시글 상세 조회
    @ApiOperation(value = "게시글 상세 조회")
    @GetMapping("/article/getArticle/{articleId}")
    public ResponseEntity<SingleResponseDto<ArticleGetResponseDto>> getArticle(@PathVariable("articleId") Long articleId){
        SingleResponseDto<ArticleGetResponseDto> response = articleService.getArticle(articleId);
        return ResponseEntity.ok(response);
    }
    //게시글 목록 조회
    @ApiOperation(value = "게시글 목록 조회")
    @GetMapping("/article/allArticles")
    public ResponseEntity<MultiResponseDto<ArticleGetResponseDto>> getAllArticle(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size){
        MultiResponseDto<ArticleGetResponseDto> articlePage = articleService.findAllArticle(page,size);
        return ResponseEntity.ok(articlePage);
    }
    @ApiOperation(value = "게시글 검색 조회")
    @GetMapping("/article/search")
    public ResponseEntity<MultiResponseDto<ArticleGetResponseDto>> searchArticle(
    @RequestParam String searchWord,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "8") int size){
        MultiResponseDto<ArticleGetResponseDto> articlePage = articleService.searchArticle(searchWord,page,size);
        return ResponseEntity.ok(articlePage);
    }
    //게시글 삭제
    @ApiOperation(value = "게시글 삭제")
    @DeleteMapping("/article/delete/{articleId}")
    public ResponseEntity deleteArticle(@PathVariable("articleId") Long articleId){
        articleService.deleteArticle(articleId);

        return ResponseEntity.ok().build();
    }
    @ApiOperation(value = "View Top5 조회")
    @GetMapping("article/view-top5")
    public ResponseEntity<SingleResponseDto<ArticleViewsTop5Dto>> getViewArticleTop5(){
        SingleResponseDto<ArticleViewsTop5Dto> response = articleService.getViewsTop5Articles();

        return ResponseEntity.ok(response);
    }
    @ApiOperation(value = "Likes Top5 조회")
    @GetMapping("article/likes-top5")
    public ResponseEntity<SingleResponseDto<ArticleLikesTop5Dto>> getLikesArticleTop5(){
        SingleResponseDto<ArticleLikesTop5Dto> response = articleService.getLikesTop5Articles();

        return ResponseEntity.ok(response);
    }

}
