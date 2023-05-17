package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.community.dto.CommentDto.CommentPatchDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentPostDto;
import com.main_032.SideQuest.community.dto.CommentDto.CommentResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.community.entity.Comment;
import com.main_032.SideQuest.community.repository.AnswerRepository;
import com.main_032.SideQuest.community.repository.CommentRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    @Transactional
    public void createComment(Long answerId, CommentPostDto commentPostDto) {
        Member member = memberService.getLoginMember();
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        findAnswer.orElseThrow(()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        Answer answer = findAnswer.get();
        Comment comment = new Comment(member.getId(),
                commentPostDto.getCategory(),
                commentPostDto.getContent(),
                0,
                answer,
                answer.getArticleId(),
                answer.getProjectId());
        answer.setComment(comment);
        commentRepository.save(comment);
    }

    @Transactional
    public void updateArticleComment(Long commentId, CommentPatchDto commentPatchDto) {
        //comment 검증
        Comment comment =getCommentOrException(commentId);
        // 로그인 한사람, comment에 담겨 있는 member ID 검증
        matchMemberID(comment);
//        checkCommentMember(comment, member);
//        checkCommentArticle(comment, commentArticleDto.getArticleId());

        comment.setContent(commentPatchDto.getContent());
        commentRepository.save(comment);
    }
    @Transactional
    public void deleteComment(Long commentId) {
        //comment 검증
        Comment comment =getCommentOrException(commentId);
        // 로그인 한사람, comment에 담겨 있는 member ID 검증
        matchMemberID(comment);
        comment.setDeleted(true);
        commentRepository.save(comment);
    }

    public MultiResponseDto<CommentResponseDto> getArticleComments(Long answerId, Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findAllComment(answerId,pageable);
        List<Comment> commentList = commentPage.getContent();

        List<CommentResponseDto> response = new ArrayList<>();
        for(Comment comment:commentList){
            Optional<Member> findMember = memberRepository.findById(comment.getMemberId());
            Member member=findMember.get();
            CommentResponseDto commentResponseDto = new CommentResponseDto(
                    memberService.getMemberInfo(comment.getMemberId()).getData(),
                    comment.getTotalLikes(),
                    comment.getContent(),
                    comment.getCreatedAt());
            response.add(commentResponseDto);
        }
        return new MultiResponseDto<CommentResponseDto>(response,commentPage);
    }

    public MultiResponseDto<CommentResponseDto> getProjectComments(Long answerId, Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findAllComment(answerId,pageable);
        List<Comment> commentList = commentPage.getContent();

        List<CommentResponseDto> response = new ArrayList<>();
        for(Comment comment:commentList){
            Optional<Member> findMember = memberRepository.findById(comment.getMemberId());
            Member member=findMember.get();
            CommentResponseDto commentResponseDto = new CommentResponseDto(
                    memberService.getMemberInfo(comment.getMemberId()).getData(),
                    comment.getTotalLikes(),
                    comment.getContent(),
                    comment.getCreatedAt());
            response.add(commentResponseDto);
        }
        return new MultiResponseDto<CommentResponseDto>(response,commentPage);
    }

    private void matchMemberID(Comment findComment) {
        Member member =memberService.getLoginMember();
        if(member.getId() != findComment.getMemberId()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }
    private Comment getCommentOrException(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}