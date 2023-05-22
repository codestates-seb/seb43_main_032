package com.main_032.SideQuest.article.controller;

import com.main_032.SideQuest.article.dto.*;
import com.main_032.SideQuest.article.service.ArticleService;
import com.main_032.SideQuest.community.dto.answer.AnswerResponseDto;
import com.main_032.SideQuest.community.dto.comment.CommentResponseDto;
import com.main_032.SideQuest.community.service.AnswerService;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Articles", description = "게시판 API")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ArticleController {

    private final ArticleService articleService;
    private final AnswerService answerService;
    private final CommentService commentService;

    //게시글 작성
    @ApiOperation(value = "게시글 작성")
    @PostMapping("/articles")
    public ResponseEntity<Void> postArticle(@RequestBody ArticlePostDto articlePostDto) {
        articleService.createArticle(articlePostDto);
        return ResponseEntity.ok().build();
    }

    //게시글 수정
    @ApiOperation(value = "게시글 수정")
    @PatchMapping("/articles/{articleId}")
    public ResponseEntity<Void> patchArticle(@PathVariable("articleId") Long articleId,
                                             @RequestBody ArticlePatchDto articlePatchDto) {
        articleService.updateArticle(articleId, articlePatchDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //게시글 상세 조회
    @ApiOperation(value = "게시글 상세 조회")
    @GetMapping("/articles/{articleId}")
    public ResponseEntity<SingleResponseDto<ArticleGetResponseDto>> getArticle(@PathVariable("articleId") Long articleId) {
        SingleResponseDto<ArticleGetResponseDto> response = articleService.getArticle(articleId);
        return ResponseEntity.ok(response);
    }

    //게시글 목록 조회
    @ApiOperation(value = "게시글 목록 조회")
    @GetMapping("/articles/find-all")
    public ResponseEntity<MultiResponseDto<ArticleGetResponseDto>> getAllArticle(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        MultiResponseDto<ArticleGetResponseDto> articlePage = articleService.findAllArticle(page - 1, size);
        return ResponseEntity.ok(articlePage);
    }

    @ApiOperation(value = "게시글 검색 조회")
    @GetMapping("/articles/search")
    public ResponseEntity<MultiResponseDto<ArticleGetResponseDto>> searchArticle(
            @RequestParam String searchWord,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        MultiResponseDto<ArticleGetResponseDto> articlePage = articleService.searchArticle(searchWord, page - 1, size);
        return ResponseEntity.ok(articlePage);
    }

    //게시글 삭제
    @ApiOperation(value = "게시글 삭제")
    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity deleteArticle(@PathVariable("articleId") Long articleId) {
        articleService.deleteArticle(articleId);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "View Top5 조회")
    @GetMapping("articles/view-top5")
    public ResponseEntity<SingleResponseDto<ArticleViewsTop5Dto>> getViewArticleTop5() {
        SingleResponseDto<ArticleViewsTop5Dto> response = articleService.getViewsTop5Articles();

        return ResponseEntity.ok(response);
    }

    @ApiOperation(value = "Likes Top5 조회")
    @GetMapping("articles/likes-top5")
    public ResponseEntity<SingleResponseDto<ArticleLikesTop5Dto>> getLikesArticleTop5() {
        SingleResponseDto<ArticleLikesTop5Dto> response = articleService.getLikesTop5Articles();

        return ResponseEntity.ok(response);
    }

    @ApiOperation(value = "게시글 답글 조회")
    @GetMapping("/articles/{articleId}/answers")
    public ResponseEntity<MultiResponseDto<AnswerResponseDto>> getArticleAnswers(
            @PathVariable("articleId") Long articleId,
            @RequestParam int page,
            @RequestParam int size) {
        MultiResponseDto<AnswerResponseDto> answerPage = answerService.findAllArticleAnswer(articleId, page - 1, size);
        return ResponseEntity.ok(answerPage);
    }

    @ApiOperation(value = "게시글 댓글 조회")
    @GetMapping("/articles/{articleId}/answers/{answerId}/comments")
    public ResponseEntity<MultiResponseDto<CommentResponseDto>> listArticleComments(@PathVariable("answerId") Long answerId,
                                                                                    @RequestParam int page,
                                                                                    @RequestParam int size) {
        MultiResponseDto<CommentResponseDto> response = commentService.getArticleComments(answerId, page - 1, size);
        return ResponseEntity.ok(response);
    }
}
