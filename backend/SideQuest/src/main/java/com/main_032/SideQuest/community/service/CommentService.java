package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.community.dto.comment.CommentInfoResponseDto;
import com.main_032.SideQuest.community.dto.comment.CommentPatchDto;
import com.main_032.SideQuest.community.dto.comment.CommentPostDto;
import com.main_032.SideQuest.community.dto.comment.CommentResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.entity.Comment;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.repository.AnswerRepository;
import com.main_032.SideQuest.community.repository.CommentRepository;
import com.main_032.SideQuest.community.repository.LikesRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final LikesRepository likesRepository;

    @Transactional
    public void createComment(Long answerId, CommentPostDto commentPostDto) {
        Member member = memberService.getLoginMember();
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        findAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
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
        Comment comment = getCommentOrException(commentId);
        // 로그인 한사람, comment에 담겨 있는 member ID 검증
        matchMemberID(comment);

        comment.setContent(commentPatchDto.getContent());
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        //comment 검증
        Comment comment = getCommentOrException(commentId);
        // 로그인 한사람, comment에 담겨 있는 member ID 검증
        matchMemberID(comment);
        comment.setDeleted(true);
        commentRepository.save(comment);
    }

    public MultiResponseDto<CommentResponseDto> getArticleComments(Long answerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Comment> commentPage = commentRepository.findAllComment(answerId, pageable);
        List<Comment> commentList = commentPage.getContent();

        List<CommentResponseDto> response = commentListToCommentReponseDtoList(commentList);

        return new MultiResponseDto<CommentResponseDto>(response, commentPage);
    }

    public MultiResponseDto<CommentResponseDto> getProjectComments(Long answerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Comment> commentPage = commentRepository.findAllComment(answerId, pageable);
        List<Comment> commentList = commentPage.getContent();

        List<CommentResponseDto> response = commentListToCommentReponseDtoList(commentList);
        return new MultiResponseDto<CommentResponseDto>(response, commentPage);
    }

    private void matchMemberID(Comment findComment) {
        Member member = memberService.getLoginMember();
        if (member.getId() != findComment.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }

    private Comment getCommentOrException(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public List<CommentResponseDto> commentListToCommentReponseDtoList(List<Comment> commentList) {
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : commentList) {
            // 댓글 작성 여부, 좋아요 여부 확인
            boolean isAuthor = false;
            boolean liked = false;

            if (memberService.isLoginMember() == true) {
                Member member = memberService.getLoginMember();
                if(member.getId() == comment.getMemberId()) isAuthor = true;

                Optional<Likes> findLikes = likesRepository.findByMemberIdAndCategoryAndCommentId(member.getId(), Category.COMMENT, comment.getId());
                if(findLikes.isEmpty() == false) liked = true;
            }
            Long uniteId = null;//project,article 통합 Id
            if(comment.getCategory().equals(Category.PROJECT)){
                uniteId = comment.getProjectId();
            }
            else if(comment.getCategory().equals(Category.ARTICLE)){
                uniteId = comment.getArticleId();
            }
            CommentResponseDto commentResponseDto = new CommentResponseDto(
                    memberService.getMemberInfo(comment.getMemberId()).getData(),
                    comment.getId(),
                    uniteId,
                    comment.getContent(),
                    comment.getTotalLikes(),
                    isAuthor,
                    liked,
                    comment.getCreatedAt()
            );
            commentResponseDtoList.add(commentResponseDto);
        }
        return commentResponseDtoList;
    }
    public MultiResponseDto<CommentInfoResponseDto> getMyComments() {
        Member member=memberService.getLoginMember();
        Pageable pageable = PageRequest.of(0,4);
        Page<Comment> commentPage = commentRepository.findMyComments(member.getId(),pageable);
        List<Comment> commentList = commentPage.getContent();
        List<CommentInfoResponseDto> commentInfoResponseDtoList = new ArrayList<>();
        for(Comment comment:commentList){
            Long uniteId = null;//project,article 통합 Id
            if(comment.getCategory().equals(Category.PROJECT)){
                uniteId = comment.getProjectId();
            }
            else if(comment.getCategory().equals(Category.ARTICLE)){
                uniteId = comment.getArticleId();
            }
            CommentInfoResponseDto commentInfoResponseDto = new CommentInfoResponseDto(
                    comment.getId(),
                    comment.getMemberId(),
                    uniteId,
                    comment.getContent(),
                    comment.getTotalLikes(),
                    comment.getCreatedAt()
            );
            commentInfoResponseDtoList.add(commentInfoResponseDto);
        }
        MultiResponseDto<CommentInfoResponseDto> response = new MultiResponseDto<CommentInfoResponseDto>(commentInfoResponseDtoList,commentPage);
        return response;
    }

    @Transactional
    public void plusTotalLikes(Long commentId) {
        Comment comment = getCommentById(commentId);
        comment.plusTotalLikes();
        commentRepository.save(comment);
    }

    @Transactional
    public void minusTotalLikes(Long commentId) {
        Comment comment = getCommentById(commentId);
        comment.minusTotalLikes();
        commentRepository.save(comment);
    }

    public Comment getCommentById(Long commentId) {
        Optional<Comment> findComment = commentRepository.findById(commentId);
        Comment comment = findComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return comment;
    }


}