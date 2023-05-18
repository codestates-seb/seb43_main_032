package com.main_032.SideQuest.community.controller;

import com.main_032.SideQuest.community.dto.AnswerDto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerDto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerDto.AnswerResponseDto;

import com.main_032.SideQuest.community.dto.CommentDto.CommentPatchDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentPostDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentResponseDto;
import com.main_032.SideQuest.community.dto.LikesPostDto;
import com.main_032.SideQuest.community.entity.Category;
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
public class CommunityController {

    private final CommentService commentService;
    private final LikesService likesService;
    private final AnswerService answerService;

    public CommunityController(CommentService commentService, LikesService likesService, AnswerService answerService) {
        this.commentService = commentService;
        this.likesService = likesService;
        this.answerService = answerService;
    }

    @ApiOperation(value = "답글 작성")
    @PostMapping("/answers")
    public ResponseEntity<Void> postAnswer(@RequestBody AnswerPostDto answerPostDto){
        answerService.createAnswer(answerPostDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "답글 수정")
    @PatchMapping("/answers/{answerId}")
    public ResponseEntity<Void> patchAnswer(@PathVariable("answerId") Long answerId,
                                            @RequestBody AnswerPatchDto answerPatchDto){
        answerService.updateAnswer(answerId,answerPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "답글 삭제")
    @DeleteMapping("/answers/{answerId}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable("answerId") Long answerId){
        answerService.deleteAnswer(answerId);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "댓글 생성")
    @PostMapping("/comments/{answerId}")
    public ResponseEntity<Void> createComment(
            @PathVariable("answerId") Long answerId,
            @RequestBody CommentPostDto commentPostDto) {
        commentService.createComment(answerId,commentPostDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "댓글 수정")
    @PatchMapping("/comments/{commentId}")
    public ResponseEntity<Void> updateArticleComment(@PathVariable("commentId") Long commentId,
                                                     @RequestBody CommentPatchDto commentPatchDto
    ) {
        commentService.updateArticleComment(commentId, commentPatchDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "댓글 삭제")
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteArticleComment(@PathVariable("commentId") Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

//    @ApiOperation(value = "댓글에 좋아요 추가")
//    @PostMapping("/comments/likes")
//    public ResponseEntity<Likes> likeComment(@RequestBody LikesPostDto likesPostDto,
//                                             @RequestHeader("email") String email) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(likesService.likeComment(likesPostDto, email));
//    }
//
//    @ApiOperation(value = "댓글에 좋아요 취소")
//    @DeleteMapping("/comment/likes/{commentId}")
//    public ResponseEntity<Void> unlikeComment(@PathVariable Long commentId,
//                                              @RequestHeader("email") String email) {
//        likesService.unlikeComment(commentId, email);
//        return ResponseEntity.noContent().build();
//    }
//
//    @ApiOperation(value = "댓글에 대한 좋아요 개수 조회")
//    @GetMapping("/comment/likes/{commentId}")
//    public ResponseEntity<Integer> countLikesByCommentId(@PathVariable Long commentId) {
//        return ResponseEntity.ok(likesService.countLikesByCommentId(commentId));
//    }

}
