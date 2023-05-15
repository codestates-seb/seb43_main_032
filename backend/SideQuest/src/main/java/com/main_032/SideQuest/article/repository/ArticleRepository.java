package com.main_032.SideQuest.article.repository;

import com.main_032.SideQuest.article.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article,Long> {
//        @Query("SELECT Article FROM Article WHERE title Like %:searchWord%")
//        Page<Article> findSearchListArticle(@Param("searchWord") String searchWord,Pageable pageable);
}
