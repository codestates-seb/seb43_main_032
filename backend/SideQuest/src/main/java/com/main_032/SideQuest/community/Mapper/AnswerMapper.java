package com.main_032.SideQuest.community.Mapper;

import com.main_032.SideQuest.community.dto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerPostDto;
import com.main_032.SideQuest.community.entity.Answer;
import org.springframework.stereotype.Component;

@Component
public class AnswerMapper {

    public Answer AnswerPostDtoToAnswer(AnswerPostDto answerPostDto){
        Answer answer = new Answer();
        answer.updateCategory(answerPostDto.getCategory());
        answer.updateArticleId(answerPostDto.getArticleId());
        answer.updateProjectId(answerPostDto.getProjectId());
        answer.updateContent(answerPostDto.getContent());

        return answer;
    }
    public Answer AnswerPatchDtoToAnswer(AnswerPatchDto answerPatchDto){
        Answer answer = new Answer();
        answer.updateContent(answerPatchDto.getContent());
        return answer;
    }
}
