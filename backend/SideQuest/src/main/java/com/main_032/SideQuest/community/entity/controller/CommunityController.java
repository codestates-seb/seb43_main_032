package com.main_032.SideQuest.community.entity.controller;

import com.main_032.SideQuest.community.entity.dto.CommentDto.CommenntAriticle.CommentArticleDto;
import com.main_032.SideQuest.community.entity.dto.CommentDto.CommentProject.CommentProjectDto;
import com.main_032.SideQuest.community.entity.service.AnswerService;
import com.main_032.SideQuest.community.entity.service.CommentService;
import com.main_032.SideQuest.community.entity.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommunityController {

    private final CommentService commentService;
//    private final LikesService likesService;

    public CommunityController(CommentService commentService) {

        this.commentService = commentService;
//        this.likesService = likesService;
    }

    @PostMapping("/articles")
    public ResponseEntity<CommentArticleDto> createArticleComment(@RequestBody CommentArticleDto commentArticleDto,
                                                                  @RequestHeader("email") String email) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createArticleComment(commentArticleDto, email));
    }
    @PostMapping("/projects")
    public ResponseEntity<CommentProjectDto> createProjectComment(@RequestBody CommentProjectDto commentProjectDto,
                                                                  @RequestHeader("email") String email) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createProjectComment(commentProjectDto, email));
    }

    @PutMapping("/articles/{id}")
    public ResponseEntity<CommentArticleDto> updateArticleComment(@PathVariable Long id,
                                                                  @RequestBody CommentArticleDto commentArticleDto,
                                                                  @RequestHeader("email") String email) {
        return ResponseEntity.ok(commentService.updateArticleComment(id, commentArticleDto, email));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<CommentProjectDto> updateProjectComment(@PathVariable Long id,
                                                                  @RequestBody CommentProjectDto commentProjectDto,
                                                                  @RequestHeader("email") String email) {
        return ResponseEntity.ok(commentService.updateProjectComment(id, commentProjectDto, email));
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticleComment(@PathVariable Long id,
                                                     @RequestHeader("email") String email) {
        commentService.deleteArticleComment(id, email);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProjectComment(@PathVariable Long id,
                                                     @RequestHeader("email") String email) {
        commentService.deleteProjectComment(id, email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/articles/{answerId}")
    public ResponseEntity<Page<CommentArticleDto>> listArticleComments(@PathVariable Long answerId,
                                                                       Pageable pageable) {
        return ResponseEntity.ok(commentService.listArticleComments(answerId, pageable));
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Page<CommentProjectDto>> listProjectComments(@PathVariable Long projectId,
                                                                       Pageable pageable) {
        return ResponseEntity.ok(commentService.listProjectComments(projectId, pageable));
    }


}
