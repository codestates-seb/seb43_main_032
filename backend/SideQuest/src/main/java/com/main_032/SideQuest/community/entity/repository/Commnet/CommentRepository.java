package com.main_032.SideQuest.community.entity.repository.Commnet;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.community.entity.entity.Answer;
import com.main_032.SideQuest.community.entity.entity.Comment;
import com.main_032.SideQuest.project.entity.Project;
import org.hibernate.sql.ordering.antlr.ColumnMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findAllByProjectAndDeletedFalse(Project project, Pageable pageable);


    Page<Comment> findAllByArticleAndDeletedFalse(Article article, Pageable pageable);

}
