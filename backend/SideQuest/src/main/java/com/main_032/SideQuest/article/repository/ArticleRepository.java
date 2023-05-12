package com.main_032.SideQuest.article.repository;

import com.main_032.SideQuest.article.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article,Long> {

}
