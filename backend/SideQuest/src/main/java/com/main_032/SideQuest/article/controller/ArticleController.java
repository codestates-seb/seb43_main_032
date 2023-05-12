package com.main_032.SideQuest.article.controller;

import com.main_032.SideQuest.article.dto.ArticlePatchDto;
import com.main_032.SideQuest.article.dto.ArticlePostDto;
import com.main_032.SideQuest.article.dto.ArticleResponseDto;
import com.main_032.SideQuest.article.service.ArticleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "article",description = "게시판 API")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }
    //게시글 작성
    @ApiOperation(value = "post Article")
    @PostMapping("/post")
    public ResponseEntity<Void> postArticle(@RequestBody ArticlePostDto articlePostDto){
        articleService.createArticle(articlePostDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    //글 수정
    @ApiOperation(value = "patch Article")
    @PatchMapping("/{article-id}")
    public ResponseEntity<ArticleResponseDto> patchArticle(@PathVariable("article-id") Long articleId,
                                                           @RequestBody ArticlePatchDto articlePatchDto){
        ArticleResponseDto response = articleService.updateArticle(articleId,articlePatchDto);

        return new ResponseEntity<ArticleResponseDto>(response,HttpStatus.OK);
    }
    //게시판 상세 조회
    @ApiOperation(value = "get Article")
    @GetMapping("/{articleId}")
    public ResponseEntity<ArticleResponseDto> getArticle(@PathVariable("articleId") Long articleId){
        ArticleResponseDto response = articleService.getArticle(articleId);
        return new ResponseEntity<ArticleResponseDto>(response,HttpStatus.OK);
    }
    //글 목록 조회
    @ApiOperation(value = "get All Article")
    @GetMapping()
    public ResponseEntity<> getAllArticle(){
        articleService.findAllArticle();
        return null;
    }
    @ApiOperation(value = "search Article")
    @GetMapping()
    public ResponseEntity<> searchArticle(){

    }
    //글 삭제
    @ApiOperation(value = "delete Article")
    @DeleteMapping()
    public ResponseEntity<> deleteArticle(){
        return null;
    }


}
