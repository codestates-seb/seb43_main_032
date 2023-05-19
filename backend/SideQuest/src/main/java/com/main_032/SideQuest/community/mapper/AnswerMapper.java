package com.main_032.SideQuest.community.mapper;

import com.main_032.SideQuest.community.dto.answer.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.answer.AnswerPostDto;
import com.main_032.SideQuest.community.dto.answer.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.repository.LikesRepository;
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
    private final LikesRepository likesRepository;

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
        // 답글 작성 여부, 좋아요 여부 확인
        boolean isAuthor = false;
        boolean liked = false;
        if (memberService.isLoginMember() == true) {
            Member member = memberService.getLoginMember();
            if(member.getId() == answer.getMemberId()) isAuthor = true;

            Optional<Likes> findLikes = likesRepository.findByMemberIdAndCategoryAndAnswerId(member.getId(), Category.ANSWER, answer.getId());
            if(findLikes.isEmpty() == false) liked = true;
        }

        AnswerResponseDto answerResponseDto = new AnswerResponseDto(
                memberService.getMemberInfo(answer.getMemberId()).getData(),
                answer.getId(),
                answer.getTotalLikes(),
                answer.getContent(),
                isAuthor,
                liked,
                answer.getCreatedAt(),
                commentService.commentListToCommentReponseDtoList(answer.getCommentList())
        );
        return answerResponseDto;
    }

}