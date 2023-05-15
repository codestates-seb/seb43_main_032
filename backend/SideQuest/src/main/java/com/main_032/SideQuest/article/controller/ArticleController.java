package com.main_032.SideQuest.article.controller;

import com.main_032.SideQuest.article.dto.ArticleDeleteDto;
import com.main_032.SideQuest.article.dto.ArticlePatchDto;
import com.main_032.SideQuest.article.dto.ArticlePostDto;
import com.main_032.SideQuest.article.dto.ArticleGetResponseDto;
import com.main_032.SideQuest.article.service.ArticleService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value = "게시글 작성")
    @PostMapping("/post")
    public ResponseEntity<Void> postArticle(@RequestBody ArticlePostDto articlePostDto){
        articleService.createArticle(articlePostDto);
        return ResponseEntity.ok().build();
    }
    //게시글 수정
    @ApiOperation(value = "게시글 수정")
    @PatchMapping("/update/{article-id}")
    public ResponseEntity<Void> patchArticle(@PathVariable("article-id") Long articleId,
                                                           @RequestBody ArticlePatchDto articlePatchDto){
        articleService.updateArticle(articleId,articlePatchDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    //게시글 상세 조회
    @ApiOperation(value = "게시글 상세 조회")
    @GetMapping("/getArticle/{articleId}")
    public ResponseEntity<SingleResponseDto<ArticleGetResponseDto>> getArticle(@PathVariable("articleId") Long articleId){
        SingleResponseDto<ArticleGetResponseDto> response = articleService.getArticle(articleId);
        return ResponseEntity.ok(response);
    }
    //게시글 목록 조회
    @ApiOperation(value = "게시글 목록 조회")
    @GetMapping("/allArticles")
    public ResponseEntity<MultiResponseDto> getAllArticle(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size){
        MultiResponseDto articlePage = articleService.findAllArticle(page,size);
        return ResponseEntity.ok(articlePage);
    }
//    @ApiOperation(value = "search Article")
//    @GetMapping("/search")
//    public ResponseEntity<MultiResponseDto> searchArticle(
//    @RequestParam String searchword,
//    @RequestParam(defaultValue = "0") int page,
//    @RequestParam(defaultValue = "8") int size){
//        MultiResponseDto articlePage = articleService.searchArticle(searchword,page,size);
//        return ResponseEntity.ok(articlePage);
//    }
    //게시글 삭제
    @ApiOperation(value = "delete Article")
    @PatchMapping("/deleted/{articleId}")
    public ResponseEntity deleteArticle(@PathVariable("articleId") Long articleId){
        articleService.deleteArticle(articleId);

        return ResponseEntity.ok().build();
    }


}
