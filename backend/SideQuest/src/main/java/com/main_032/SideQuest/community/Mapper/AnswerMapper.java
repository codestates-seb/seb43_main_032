package com.main_032.SideQuest.community.Mapper;

import com.main_032.SideQuest.community.dto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AnswerMapper {
    private final MemberRepository memberRepository;

    public AnswerMapper(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

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
//    public Answer AnswerToAnswerResponseDto(Answer answer){
//
//        AnswerResponseDto answerResponseDto = new AnswerResponseDto(
//
//        );
//
//    }
//    public AnswerResponseDto AnswerListToAnswerResponseDtoList(List<Answer> answerList){
//        for(Answer answer: answerList){
//            answer =
//        }
//    }
}
