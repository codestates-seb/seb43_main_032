package com.main_032.SideQuest.community.repository;


import com.main_032.SideQuest.community.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.answer.id = :answerId AND c.deleted != 1")
    Page<Comment> findAllComment(Long answerId, Pageable pageable);

    @Query("SELECT c FROM Comment c WHERE c.memberId = :memberId AND c.deleted != 1")
    Page<Comment> findMyComments(Long memberId, Pageable pageable);
}
