package com.main_032.SideQuest.community.Mapper;

import com.main_032.SideQuest.community.dto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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
    public AnswerResponseDto AnswerToAnswerResponseDto(Answer answer){
        Optional<Member> findmember = memberRepository.findById(answer.getMemberId());
        findmember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Member member = findmember.get();
        AnswerResponseDto answerResponseDto = new AnswerResponseDto(
            member.getName(),
                member.getTotalStar(),
                answer.getTotalLikes(),
                answer.getContent()
                //나중에 comment 추가
        );
        return answerResponseDto;
    }
    public List<AnswerResponseDto> AnswerListToAnswerResponseDtoList(List<Answer> answerList){
        List<AnswerResponseDto> answerResponseDtoList= new ArrayList<>();

        for(Answer answer: answerList){
            Optional<Member> findmember = memberRepository.findById(answer.getMemberId());
            findmember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            AnswerResponseDto answerResponseDto = AnswerToAnswerResponseDto(answer);
            answerResponseDtoList.add(answerResponseDto);
        }
        return answerResponseDtoList;
    }
}
