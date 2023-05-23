package com.main_032.SideQuest.community.controller;

import com.main_032.SideQuest.community.dto.answer.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.answer.AnswerPostDto;

import com.main_032.SideQuest.community.dto.chat.ChatPostDto;
import com.main_032.SideQuest.community.dto.chat.ChatResponseDto;
import com.main_032.SideQuest.community.dto.comment.CommentPatchDto;
import com.main_032.SideQuest.community.dto.comment.CommentPostDto;
import com.main_032.SideQuest.community.dto.likes.LikesPostDto;
import com.main_032.SideQuest.community.dto.likes.LikesResponseDto;
import com.main_032.SideQuest.community.dto.likes.LikesUndoPostDto;
import com.main_032.SideQuest.community.service.AnswerService;
import com.main_032.SideQuest.community.service.ChatService;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.community.service.LikesService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Api(tags = {"Community"}, description = "커뮤니티 API")
@RestController
public class CommunityController {

    private final CommentService commentService;
    private final LikesService likesService;
    private final AnswerService answerService;
    private final ChatService chatService;

    public CommunityController(CommentService commentService, LikesService likesService, AnswerService answerService, ChatService chatService) {
        this.commentService = commentService;
        this.likesService = likesService;
        this.answerService = answerService;
        this.chatService = chatService;
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

    @ApiOperation(value = "좋아요")
    @PostMapping("/likes")
    public ResponseEntity<SingleResponseDto<LikesResponseDto>> likes(@RequestBody LikesPostDto likesPostDto) {
        LikesResponseDto likesResponseDto = likesService.likes(likesPostDto);
        SingleResponseDto<LikesResponseDto> singleResponseDto = new SingleResponseDto<>(likesResponseDto);

        return new ResponseEntity(singleResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 취소")
    @PostMapping("/likes/undo")
    public ResponseEntity<SingleResponseDto<LikesResponseDto>> likesUndo(@RequestBody LikesUndoPostDto likesUndoPostDto) {
        LikesResponseDto likesResponseDto = likesService.likesUndo(likesUndoPostDto);
        SingleResponseDto<LikesResponseDto> singleResponseDto = new SingleResponseDto<>(likesResponseDto);

        return new ResponseEntity(singleResponseDto, HttpStatus.OK);
    }
    @ApiOperation(value = "쪽지 보내기")
    @PostMapping("/chat/{memberId}")
    public ResponseEntity<Void> messageExpress(@RequestBody ChatPostDto chatPostDto){
        chatService.sendMessage(chatPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @ApiOperation(value = "받은 쪽지 삭제")
    @DeleteMapping("/chat/{chatId}")
    public ResponseEntity<Void> messageDelete(@PathVariable("chatId") Long chatId){
        chatService.deleteMessage(chatId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "쪽지 조회")
    @GetMapping("/chat/find-all")
    public ResponseEntity<MultiResponseDto<ChatResponseDto>> findAllMyMessages(
            @RequestParam int page,
            @RequestParam int size){
        MultiResponseDto<ChatResponseDto> response = chatService.getAllMessages(page-1,size);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
