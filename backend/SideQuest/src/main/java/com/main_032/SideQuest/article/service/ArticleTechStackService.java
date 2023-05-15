package com.main_032.SideQuest.article.service;

import com.main_032.SideQuest.article.entity.ArticleTechStack;
import com.main_032.SideQuest.article.repository.ArticleTechStackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArticleTechStackService {
    ArticleTechStackRepository articleTechStackRepository;

    public ArticleTechStackService(ArticleTechStackRepository articleTechStackRepository) {
        this.articleTechStackRepository = articleTechStackRepository;
    }
    @Transactional
    public void updateArticleTechStack(List<String> articleTechStackList, Long articleId){
        //원래 있던 스택 제거
        if(articleTechStackRepository.findByArticleId(articleId).size() != 0){
            articleTechStackRepository.deleteByArticleId(articleId);
        }

        for (int i = 0; i < articleTechStackList.size(); i++) {
            ArticleTechStack articleTechStack = new ArticleTechStack();
            articleTechStack.updateTech(articleTechStackList.get(i));
            articleTechStack.updateArticleId(articleId);
            articleTechStackRepository.save(articleTechStack);
        }
    }
    @Transactional
    public List<ArticleTechStack> getAllarticleTechStackList(Long articleId){
        List<ArticleTechStack> articleTechStackList =articleTechStackRepository.findByArticleId(articleId);

        return articleTechStackList;
    }

}
