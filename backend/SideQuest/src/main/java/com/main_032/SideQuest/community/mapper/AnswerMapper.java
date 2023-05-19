package com.main_032.SideQuest.community.mapper;

import com.main_032.SideQuest.community.dto.answer.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.answer.AnswerPostDto;
import com.main_032.SideQuest.community.dto.answer.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Component
@AllArgsConstructor
public class AnswerMapper {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final CommentService commentService;

    public Answer AnswerPostDtoToAnswer(AnswerPostDto answerPostDto, Long memberId) {
        Answer answer = new Answer(answerPostDto.getCategory(), memberId, answerPostDto.getUniteId(), answerPostDto.getContent());
        return answer;
    }

    public Answer AnswerPatchDtoToAnswer(Answer answer, AnswerPatchDto answerPatchDto) {
        answer.updateContent(answerPatchDto.getContent());
        return answer;
    }

    public List<AnswerResponseDto> AnswerListToAnswerResponseDtoList(List<Answer> answerList) {
        List<AnswerResponseDto> answerResponseDtoList = new ArrayList<>();

        for (Answer answer : answerList) {
            Optional<Member> findMember = memberRepository.findById(answer.getMemberId());
            findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            AnswerResponseDto answerResponseDto = AnswerToAnswerResponseDto(answer);
            answerResponseDtoList.add(answerResponseDto);
        }
        return answerResponseDtoList;
    }

    public AnswerResponseDto AnswerToAnswerResponseDto(Answer answer) {
        boolean isLoginMember = memberService.isLoginMember();
        boolean isAuthor;
        if (isLoginMember == true) {
            Member member = memberService.getLoginMember();
            if (Objects.equals(member.getId(), answer.getMemberId())) {
                isAuthor = true;
            } else {
                isAuthor = false;
            }
        } else {   //로그인 안하면
            isAuthor = false;
        }

        AnswerResponseDto answerResponseDto = new AnswerResponseDto(
                memberService.getMemberInfo(answer.getMemberId()).getData(),
                answer.getId(),
                answer.getTotalLikes(),
                answer.getContent(),
                isAuthor,
                answer.getCreatedAt(),
                commentService.commentListToCommentReponseDtoList(answer.getCommentList())
                //나중에 comment 추가
        );
        return answerResponseDto;
    }

}