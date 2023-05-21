package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.article.service.ArticleService;
import com.main_032.SideQuest.community.dto.likes.LikesPostDto;
import com.main_032.SideQuest.community.dto.likes.LikesResponseDto;
import com.main_032.SideQuest.community.dto.likes.LikesUndoPostDto;
import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.repository.LikesRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.service.ProjectService;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;
    private final ProjectService projectService;
    private final ArticleService articleService;
    private final AnswerService answerService;
    private final CommentService commentService;
    private final MemberService memberService;

    @Transactional
    public LikesResponseDto likes(LikesPostDto likesPostDto) {
        Long uniteId = likesPostDto.getUniteId();
        Member member = memberService.getLoginMember();
        int totalLikes = 0;

        Likes likes = new Likes(member.getId(), likesPostDto.getCategory(), uniteId);
        likesRepository.save(likes);

        Category category = likesPostDto.getCategory();
        if(category.equals(Category.PROJECT)) {
            projectService.plusTotalLikes(uniteId);
            totalLikes = projectService.getProjectById(uniteId).getTotalLikes();
        }
        else if(category.equals(Category.ARTICLE)) {
            articleService.plusTotalLikes(uniteId);
            totalLikes = articleService.getArticleById(uniteId).getTotalLikes();
        }
        else if(category.equals(Category.ANSWER)) {
            answerService.plusTotalLikes(uniteId);
            totalLikes = answerService.getAnswerById(uniteId).getTotalLikes();
        }
        else {
            commentService.plusTotalLikes(uniteId);
            totalLikes = commentService.getCommentById(uniteId).getTotalLikes();
        }

        LikesResponseDto likesResponseDto = new LikesResponseDto(totalLikes, true);
        return likesResponseDto;
    }

    @Transactional
    public LikesResponseDto likesUndo(LikesUndoPostDto likesUndoPostDto) {
        Long uniteId = likesUndoPostDto.getUniteId();
        Long memberId = memberService.getLoginMember().getId();
        Category category = likesUndoPostDto.getCategory();
        Optional<Likes> findLikes = null;
        int totalLikes = 0;

        if(category.equals(Category.PROJECT)) {
            findLikes = likesRepository.findByMemberIdAndCategoryAndProjectId(memberId, category, uniteId);
            projectService.minusTotalLikes(uniteId);
            totalLikes = projectService.getProjectById(uniteId).getTotalLikes();
        }
        else if(category.equals(Category.ARTICLE)) {
            findLikes = likesRepository.findByMemberIdAndCategoryAndArticleId(memberId, category, uniteId);
            articleService.minusTotalLikes(uniteId);
            totalLikes = articleService.getArticleById(uniteId).getTotalLikes();
        }
        else if(category.equals(Category.ANSWER)) {
            findLikes = likesRepository.findByMemberIdAndCategoryAndAnswerId(memberId, category, uniteId);
            answerService.minusTotalLikes(uniteId);
            totalLikes = answerService.getAnswerById(uniteId).getTotalLikes();
        }
        else {
            findLikes = likesRepository.findByMemberIdAndCategoryAndCommentId(memberId, category, uniteId);
            commentService.minusTotalLikes(uniteId);
            totalLikes = commentService.getCommentById(uniteId).getTotalLikes();
        }

        Likes likes = findLikes.orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKES_NOT_FOUND));
        likesRepository.delete(likes);

        LikesResponseDto likesResponseDto = new LikesResponseDto(totalLikes, false);
        return likesResponseDto;
    }
}