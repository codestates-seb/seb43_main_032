package com.main_032.SideQuest.community.controller;

import com.main_032.SideQuest.community.dto.CommentDto.CommenntAriticle.CommentArticleDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentProject.CommentProjectDto;
import com.main_032.SideQuest.community.dto.LikesPostDto;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.community.service.LikesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Api(tags = {"Community"}, description = "커뮤니티 API")
@RestController
@RequestMapping("/community")
public class CommunityController {

    private final CommentService commentService;
    private final LikesService likesService;

    public CommunityController(CommentService commentService, LikesService likesService) {

        this.commentService = commentService;
        this.likesService = likesService;
    }
    @ApiOperation(value = "아티클 댓글 생성")
    @PostMapping("/comment/article")
    public ResponseEntity<CommentArticleDto> createArticleComment(@RequestBody CommentArticleDto commentArticleDto,
                                                                  @RequestParam("email") String email) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createArticleComment(commentArticleDto, email));
    }
    @ApiOperation(value = "프로젝트 댓글 생성")
    @PostMapping("/comment/project")
    public ResponseEntity<CommentProjectDto> createProjectComment(@RequestBody CommentProjectDto commentProjectDto,
                                                                  @RequestParam("email") String email) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createProjectComment(commentProjectDto, email));
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

    @ApiOperation(value = "아티클 댓글 수정")
    @PatchMapping("/comment/article/{id}")
    public ResponseEntity<CommentArticleDto> updateArticleComment(@PathVariable Long id,
                                                                  @RequestBody CommentArticleDto commentArticleDto,
                                                                  @RequestParam("email") String email) {
        return ResponseEntity.ok(commentService.updateArticleComment(id, commentArticleDto, email));
    }
    @ApiOperation(value = "프로젝트 댓글 수정")
    @PatchMapping("/comment/project/{id}")
    public ResponseEntity<CommentProjectDto> updateProjectComment(@PathVariable Long id,
                                                                  @RequestBody CommentProjectDto commentProjectDto,
                                                                  @RequestParam("email") String email) {
        return ResponseEntity.ok(commentService.updateProjectComment(id, commentProjectDto, email));
    }
    @ApiOperation(value = "아티클 댓글 삭제")
    @DeleteMapping("/comment/article/{id}")
    public ResponseEntity<Void> deleteArticleComment(@PathVariable Long id,
                                                     @RequestParam("email") String email) {
        commentService.deleteArticleComment(id, email);
        return ResponseEntity.noContent().build();
    }
    @ApiOperation(value = "프로젝트 댓글 삭제")
    @DeleteMapping("/comment/project/{id}")
    public ResponseEntity<Void> deleteProjectComment(@PathVariable Long id,
                                                     @RequestParam("email") String email) {
        commentService.deleteProjectComment(id, email);
        return ResponseEntity.noContent().build();
    }
    @ApiOperation(value = "아티클 댓글 조회")
    @GetMapping("/comment/article/{answerId}")
    public ResponseEntity<Page<CommentArticleDto>> listArticleComments(@PathVariable Long answerId,
                                                                       Pageable pageable) {
        return ResponseEntity.ok(commentService.listArticleComments(answerId, pageable));
    }
    @ApiOperation(value = "프로젝트 댓글 조회")
    @GetMapping("/comment/project/{projectId}")
    public ResponseEntity<Page<CommentProjectDto>> listProjectComments(@PathVariable Long projectId,
                                                                       Pageable pageable) {
        return ResponseEntity.ok(commentService.listProjectComments(projectId, pageable));
    }




}
