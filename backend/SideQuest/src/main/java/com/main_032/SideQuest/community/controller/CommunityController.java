package com.main_032.SideQuest.community.controller;

import com.main_032.SideQuest.community.dto.AnswerDto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerDto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerDto.AnswerResponseDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentPatchDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentPostDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentResponseDto;
import com.main_032.SideQuest.community.dto.LikesPostDto;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.service.AnswerService;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.community.service.LikesService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Api(tags = {"Community"}, description = "커뮤니티 API")
@RestController
@RequestMapping("/comments")
public class CommunityController {

    private final CommentService commentService;
    private final LikesService likesService;
    private final AnswerService answerService;

    public CommunityController(CommentService commentService, LikesService likesService, AnswerService answerService) {
        this.commentService = commentService;
        this.likesService = likesService;
        this.answerService = answerService;
    }

    @ApiOperation(value = "댓글 생성")
    @PostMapping("/comment/{answer-Id}")
    public ResponseEntity<Void> createComment(
            @PathVariable("answer-Id") Long answerId,
            @RequestBody CommentPostDto commentPostDto) {
        commentService.createComment(answerId,commentPostDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "댓글에 좋아요 추가")
    @PostMapping("/comment/likes")
    public ResponseEntity<Likes> likeComment(@RequestBody LikesPostDto likesPostDto,
                                             @RequestHeader("email") String email) {
        return ResponseEntity.status(HttpStatus.CREATED).body(likesService.likeComment(likesPostDto, email));
    }

    @ApiOperation(value = "댓글에 좋아요 취소")
    @DeleteMapping("/comment/likes/{commentId}")
    public ResponseEntity<Void> unlikeComment(@PathVariable Long commentId,
                                              @RequestHeader("email") String email) {
        likesService.unlikeComment(commentId, email);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "댓글에 대한 좋아요 개수 조회")
    @GetMapping("/comment/likes/{commentId}")
    public ResponseEntity<Integer> countLikesByCommentId(@PathVariable Long commentId) {
        return ResponseEntity.ok(likesService.countLikesByCommentId(commentId));
    }

    @ApiOperation(value = "댓글 수정")
    @PatchMapping("/update/{comment-id}")
    public ResponseEntity<Void> updateArticleComment(@PathVariable("comment-id") Long commentId,
                                                     @RequestBody CommentPatchDto commentPatchDto
                                                     ) {
        commentService.updateArticleComment(commentId, commentPatchDto);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value = "댓글 삭제")
    @DeleteMapping("/comment/article/{id}")
    public ResponseEntity<Void> deleteArticleComment(@PathVariable("id") Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
    @ApiOperation(value = "아티클 댓글 조회")
    @GetMapping("/comment/article/{answerId}")
    public ResponseEntity<MultiResponseDto<CommentResponseDto>> listArticleComments(@PathVariable("answerId") Long answerId,
                                                                                   Pageable pageable) {
        MultiResponseDto<CommentResponseDto> response = commentService.getArticleComments(answerId,pageable);
        return ResponseEntity.ok(response);
    }
    @ApiOperation(value = "프로젝트 댓글 조회")
    @GetMapping("/comment/project/{answerId}")
    public ResponseEntity<MultiResponseDto<CommentResponseDto>> listProjectComments(@PathVariable("answerId") Long answerId,
                                                                       Pageable pageable) {
        MultiResponseDto<CommentResponseDto> response = commentService.getProjectComments(answerId,pageable);
        return ResponseEntity.ok(response);
    }
    @ApiOperation(value = "답글 작성")
    @PostMapping("/answer/post")
    public ResponseEntity<Void> postAnswer(@RequestBody AnswerPostDto answerPostDto){
        answerService.createAnswer(answerPostDto);
        return ResponseEntity.ok().build();
    }

    //patch
    @ApiOperation(value = "답글 수정")
    @PatchMapping("/answer/{answerId}")
    public ResponseEntity<Void> patchAnswer(@PathVariable("answerId") Long answerId,
                                            @RequestBody AnswerPatchDto answerPatchDto){
        answerService.updateAnswer(answerId,answerPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "답글 삭제")
    @DeleteMapping("/answer/deleted/{answerId}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable("answerId") Long answerId){
        answerService.deleteAnswer(answerId);
        return ResponseEntity.ok().build();
    }

//    @ApiOperation(value = "게시글 답글 조회")
//    @GetMapping("/answer/ArticleAnswer/{article-id}")
//    public ResponseEntity<MultiResponseDto<AnswerResponseDto>> getArticleAnswers(
//            @PathVariable("article-id") Long articleId,
//            @RequestParam int page,
//            @RequestParam int size){
//        MultiResponseDto<AnswerResponseDto> answerPage = answerService.findAllArticleAnswer(articleId,page,size);
//        return ResponseEntity.ok(answerPage);
//    }
//    @ApiOperation(value = "프로젝트 답글 조회")
//    @GetMapping("/answer/ProjectAnswer/{project-id}")
//    public ResponseEntity<MultiResponseDto<AnswerResponseDto>> getProjectAnswers(
//            @PathVariable("project-id") Long projectId,
//            @RequestParam int page,
//            @RequestParam int size){
//        MultiResponseDto<AnswerResponseDto> answerPage = answerService.findAllProjectAnswer(projectId,page,size);
//        return ResponseEntity.ok(answerPage);
//    }



}
