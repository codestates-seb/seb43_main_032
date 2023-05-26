package com.main_032.SideQuest.article.repository;

import com.main_032.SideQuest.article.entity.ArticleTechStack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleTechStackRepository extends JpaRepository<ArticleTechStack,Long> {
        List<ArticleTechStack> findByArticleId(Long articleId);
        void deleteByArticleId(Long articleId);

}
