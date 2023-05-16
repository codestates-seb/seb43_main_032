package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.community.dto.LikesPostDto;
import com.main_032.SideQuest.community.entity.Comment;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.repository.Commnet.CommentRepository;
import com.main_032.SideQuest.community.repository.LikesRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
public class LikesService {
    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    public LikesService(LikesRepository likesRepository, MemberRepository memberRepository, CommentRepository commentRepository) {
        this.likesRepository = likesRepository;
        this.memberRepository = memberRepository;
        this.commentRepository = commentRepository;
    }

    @Transactional
    public Likes likeComment(LikesPostDto likesPostDto, String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("No Member found with the given email."));
        Comment comment = commentRepository.findById(likesPostDto.getCommentId())
                .orElseThrow(() -> new NoSuchElementException("No Comment found with the given id."));
        Likes existingLike = likesRepository.findByMemberIdAndCommentId(member.getId(), comment.getId())
                .orElse(null);

        if (existingLike != null) {
            throw new IllegalArgumentException("You've already liked this comment.");
        }

        Likes likes = new Likes();
        likes.setMemberId(member.getId());
        likes.setCommentId(comment.getId());

        return likesRepository.save(likes);
    }

    @Transactional
    public void unlikeComment(Long commentId, String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("No Member found with the given email."));
        Likes likes = likesRepository.findByMemberIdAndCommentId(member.getId(), commentId)
                .orElseThrow(() -> new NoSuchElementException("No like found for the given comment and member."));

        likesRepository.delete(likes);
    }

    public int countLikesByCommentId(Long commentId) {
        return likesRepository.countByCommentId(commentId);
    }
}