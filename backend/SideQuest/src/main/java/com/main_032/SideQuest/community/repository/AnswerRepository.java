package com.main_032.SideQuest.community.repository;

import com.main_032.SideQuest.community.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    @Query("SELECT aw FROM Answer aw WHERE aw.articleId = :articleId")
    Page<Answer> findAllArticleAnswer(Long articleId, Pageable pageable);
    @Query("SELECT aw FROM Answer aw WHERE aw.projectId = :projectId")
    Page<Answer> findAllProjectAnswer(Long projectId, Pageable pageable);


}