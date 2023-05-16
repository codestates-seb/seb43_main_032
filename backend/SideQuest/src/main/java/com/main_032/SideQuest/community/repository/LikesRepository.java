package com.main_032.SideQuest.community.repository;

import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByMemberIdAndCommentId(Long memberId, Long commentId);
    int countByCommentId(Long commentId);



}
