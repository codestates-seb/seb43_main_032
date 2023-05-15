package com.main_032.SideQuest.community.repository;

import com.main_032.SideQuest.community.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface AnswerRepository extends JpaRepository<Answer,Long> {
    @Query("SELECT aw FROM Answer aw WHERE aw.articleId = :articleId")
    Page<Answer> findAllArticleAnswerPage(Long articleId, Pageable pageable);
    @Query("SELECT p FROM Project p WHERE p.projectId = :'projectId'")
    Page<Answer> findAllProjectAnswerPage(Pageable pageable);


}
