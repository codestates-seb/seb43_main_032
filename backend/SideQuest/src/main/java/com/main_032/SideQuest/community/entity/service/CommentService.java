package com.main_032.SideQuest.community.entity.service;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.repository.ArticleRepository;
import com.main_032.SideQuest.community.entity.dto.CommentDto.CommenntAriticle.CommentArticleDto;
import com.main_032.SideQuest.community.entity.dto.CommentDto.CommentProject.CommentProjectDto;
import com.main_032.SideQuest.community.entity.entity.Answer;
import com.main_032.SideQuest.community.entity.entity.Comment;
import com.main_032.SideQuest.community.entity.repository.AnswerRepository;
import com.main_032.SideQuest.community.entity.repository.Commnet.CommentRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public CommentArticleDto createArticleComment(CommentArticleDto commentArticleDto, String email) {
        Member member = getMemberOrException(email);
        Article article = getArticleOrException(commentArticleDto.getArticleId());
        Comment comment = Comment.builder()
                .memberId(member.getId())
                .article(article)
                .content(commentArticleDto.getContent())
                .totalLikes(0)
                .deleted(false)
                .build();
        return CommentArticleDto.from(commentRepository.save(comment));
    }

    @Transactional
    public CommentProjectDto createProjectComment(CommentProjectDto commentProjectDto, String email) {
        Member member = getMemberOrException(email);
        Project project = getProjectOrException(commentProjectDto.getProjectId());
        Comment comment = Comment.builder()
                .memberId(member.getId())
                .project(project)
                .content(commentProjectDto.getContent())
                .totalLikes(0)
                .deleted(false)
                .build();
        return CommentProjectDto.from(commentRepository.save(comment));
    }

    @Transactional
    public CommentArticleDto updateArticleComment(Long commentId, CommentArticleDto commentArticleDto, String email) {
        Member member = getMemberOrException(email);
        Comment comment = getCommentOrException(commentId);
        checkCommentMember(comment, member);
        checkCommentArticle(comment, commentArticleDto.getArticleId());

        comment.setContent(commentArticleDto.getContent());

        return CommentArticleDto.from(commentRepository.save(comment));
    }

    @Transactional
    public CommentProjectDto updateProjectComment(Long commentId, CommentProjectDto commentProjectDto, String email) {
        Member member = getMemberOrException(email);
        Comment comment = getCommentOrException(commentId);
        checkCommentMember(comment, member);
        checkCommentProject(comment, commentProjectDto.getProjectId());

        comment.setContent(commentProjectDto.getContent());

        return CommentProjectDto.from(commentRepository.save(comment));
    }

    @Transactional
    public void deleteArticleComment(Long commentId, String email) {
        Member member = getMemberOrException(email);
        Comment comment = getCommentOrException(commentId);
        checkCommentMember(comment, member);

        comment.setDeleted(true);
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteProjectComment(Long commentId, String email) {
        Member member = getMemberOrException(email);
        Comment comment = getCommentOrException(commentId);
        checkCommentMember(comment, member);

        comment.setDeleted(true);
        commentRepository.save(comment);
    }

    private Comment getCommentOrException(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    private void checkCommentMember(Comment comment, Member member) {
        if (!Objects.equals(comment.getMemberId(), member.getId())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION);
        }
    }

    private void checkCommentArticle(Comment comment, Long articleId) {
        if (!Objects.equals(comment.getArticle().getId(), articleId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST);
        }
    }

    private void checkCommentProject(Comment comment, Long projectId) {
        if (!Objects.equals(comment.getProject().getId(), projectId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST);
        }
    }

    private Member getMemberOrException(String email) {
        return memberRepository.findByEmail(email).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }



    public Page<CommentArticleDto> listArticleComments(Long articleId, Pageable pageable) {
        Article article = getArticleOrException(articleId);
        return commentRepository.findAllByArticleAndDeletedFalse(article, pageable)
                .map(comment -> CommentArticleDto.from(comment));
    }

    public Page<CommentProjectDto> listProjectComments(Long projectId, Pageable pageable) {
        Project project = getProjectOrException(projectId);
        return commentRepository.findAllByProjectAndDeletedFalse(project, pageable)
                .map(CommentProjectDto::from);
    }

    private Article getArticleOrException(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    private Project getProjectOrException(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
    }
}