package com.main_032.SideQuest.community.repository;

import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    Optional<Likes> findByMemberIdAndCategoryAndProjectId(Long memberId, Category category, Long uniteId);

    Optional<Likes> findByMemberIdAndCategoryAndArticleId(Long memberId, Category category, Long uniteId);

    Optional<Likes> findByMemberIdAndCategoryAndAnswerId(Long memberId, Category category, Long uniteId);

    Optional<Likes> findByMemberIdAndCategoryAndCommentId(Long memberId, Category category, Long uniteId);
}
