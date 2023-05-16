package com.main_032.SideQuest.community.controller;

import com.main_032.SideQuest.community.dto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerResponseDto;
import com.main_032.SideQuest.community.service.AnswerService;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.community.service.LikesService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Api(tags = "community",description = "댓글,답글,좋아요 API")
@RestController
public class CommunityController {

    private final AnswerService answerService;
    private final CommentService commentService;
    private final LikesService likesService;


    public CommunityController(AnswerService answerService, CommentService commentService, LikesService likesService) {
        this.answerService = answerService;
        this.commentService = commentService;
        this.likesService = likesService;
    }

    //post
    @ApiOperation(value = "답글 작성")
    @PostMapping("/answer")
    public ResponseEntity<Void> postAnswer(@RequestBody AnswerPostDto answerPostDto){
        answerService.createAnswer(answerPostDto);
        return ResponseEntity.ok().build();
    }

    //patch
    @ApiOperation(value = "답글 수정")
    @PatchMapping("/{answerId}")
    public ResponseEntity<Void> patchAnswer(@PathVariable("answerId") Long answerId,
                                            @RequestBody AnswerPatchDto answerPatchDto){
        answerService.updateAnswer(answerId,answerPatchDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "답글 삭제")
    @DeleteMapping("/deleted/{answerId}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable("answerId") Long answerId){
        answerService.deleteAnswer(answerId);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "게시글 답글 조회")
    @GetMapping("/ArticleAnswer/{article-id}")
    public ResponseEntity<MultiResponseDto<AnswerResponseDto>> getArticleAnswers(
            @PathVariable("article-id") Long articleId,
            @RequestParam int page,
            @RequestParam int size){
        MultiResponseDto answerPage = answerService.findAllArticleAnswer(articleId,page,size);
        return ResponseEntity.ok(answerPage);
    }
    @ApiOperation(value = "프로젝트 답글 조회")
    @GetMapping("/ProjectAnswerList/project-id")
    public ResponseEntity<MultiResponseDto<AnswerResponseDto>> getProjectAnswers(
            @PathVariable("project-id") Long projectId,
            @RequestParam int page,
            @RequestParam int size){
        MultiResponseDto answerPage = answerService.findAllProjectAnswer(projectId,page,size);
        return ResponseEntity.ok(answerPage);
    }

}
