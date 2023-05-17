package com.main_032.SideQuest.community.Mapper;

import com.main_032.SideQuest.community.dto.AnswerDto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerDto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerDto.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Component
public class AnswerMapper {
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public AnswerMapper(MemberRepository memberRepository, MemberService memberService) {
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    public Answer AnswerPostDtoToAnswer(AnswerPostDto answerPostDto, Long memberId){
        Answer answer = new Answer(answerPostDto.getCategory(),memberId,answerPostDto.getUniteId(), answerPostDto.getContent());
        return answer;
    }
    public Answer AnswerPatchDtoToAnswer(Answer answer,AnswerPatchDto answerPatchDto){
        answer.updateContent(answerPatchDto.getContent());
        return answer;
    }
    public AnswerResponseDto AnswerToAnswerResponseDto(Answer answer){
        Optional<Member> findmember = memberRepository.findById(answer.getMemberId());
        findmember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Member member = findmember.get();
        AnswerResponseDto answerResponseDto = new AnswerResponseDto(
                memberService.getMemberInfo(answer.getMemberId()).getData(),
                answer.getTotalLikes(),
                answer.getContent(),
                answer.getCreatedAt()
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