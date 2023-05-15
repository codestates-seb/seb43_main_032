package com.main_032.SideQuest.community.entity.repository;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.community.entity.entity.Comment;
import com.main_032.SideQuest.community.entity.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByMemberIdAndCommentId(Long memberId, Long commentId);
    int countByCommentId(Long commentId);



}
