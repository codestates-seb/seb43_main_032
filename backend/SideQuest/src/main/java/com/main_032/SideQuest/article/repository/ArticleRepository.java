package com.main_032.SideQuest.article.repository;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article,Long> {
        @Query("SELECT a FROM Article a WHERE a.title Like %:searchWord% AND a.deleted != 1")
        Page<Article> findSearchListArticle(@Param("searchWord") String searchWord,Pageable pageable);
        @Query("SELECT a FROM Article a WHERE a.deleted != 1")
        Page<Article> findAllArticlePage(Pageable pageable);

        @Query("SELECT a FROM Article a WHERE a.deleted = false ORDER BY a.views DESC")
        List<Article> getTop5ViewsArticles(Pageable pageable);

        @Query("SELECT a FROM Article a WHERE a.deleted = false ORDER BY a.totalLikes DESC")
        List<Article> getTop5LikesArticles(Pageable pageable);

        @Query("SELECT a FROM Article a WHERE a.deleted != 1 AND a.memberId = :memberId")
        Page<Article> findMyArticlePage(Long memberId, Pageable pageable);
}
