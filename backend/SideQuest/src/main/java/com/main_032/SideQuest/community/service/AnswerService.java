package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.repository.ArticleRepository;
import com.main_032.SideQuest.community.Mapper.AnswerMapper;
import com.main_032.SideQuest.community.dto.AnswerDeleteDto;
import com.main_032.SideQuest.community.dto.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.AnswerPostDto;
import com.main_032.SideQuest.community.dto.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.community.repository.AnswerRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.repository.MemberRepository;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final AnswerMapper mapper;
    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;

    public AnswerService(AnswerRepository answerRepository, MemberService memberService, AnswerMapper mapper, MemberRepository memberRepository, ArticleRepository articleRepository, ProjectRepository projectRepository) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
        this.articleRepository = articleRepository;
        this.projectRepository = projectRepository;
    }

    public void createAnswer(AnswerPostDto answerPostDto){
        //검증 :,Article,project
        if(answerPostDto.getProjectId()>0){
            verifyProject(answerPostDto.getProjectId());
        }
        else if(answerPostDto.getArticleId()>0){
            verifyArticle(answerPostDto.getArticleId());
        }
        Answer answer = mapper.AnswerPostDtoToAnswer(answerPostDto);
        answer.updateMemberId(memberService.getLoginMember().getId());
        answerRepository.save(answer);
    }

    public void updateAnswer(Long answerId,AnswerPatchDto answerPatchDto){
        //답글 존재 여부 확인
        Optional<Answer> findAnswer = verifyAnswer(answerId);
        //멤버 ID 매치 확인
        memberMatchId(findAnswer);
        Answer answer = mapper.AnswerPatchDtoToAnswer(answerPatchDto);
        answerRepository.save(answer);
    }
    public void deleteAnswer(Long answerId){
        Optional<Answer> findAnswer = verifyAnswer(answerId);
        memberMatchId(findAnswer);
        Answer answer = findAnswer.get();
        answer.delete();
        answerRepository.save(answer);
    }
//    public MultiResponseDto<AnswerResponseDto> findAllArticleAnswer(Long articleId,int page,int size){
//        Page<Answer> answerPage =answerRepository.findAllArticleAnswerPage(articleId, PageRequest.of(page,size,Sort.by("id").descending()));
//        List<Answer> answerList = answerPage.getContent();
//        List<AnswerResponseDto> answerResponseDtoList = mapper.AnswerListToAnswerResponseDtoList(answerList);
//        MultiResponseDto<AnswerResponseDto> response = new MultiResponseDto<AnswerResponseDto>(answerList,answerPage);
//        return
//    }

    private Optional<Answer> verifyAnswer(Long Id) {
        Optional<Answer> findAnswer =answerRepository.findById(Id);
        findAnswer.orElseThrow(() ->new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
    private void memberMatchId(Optional<Answer> findAnswer) {
        Member member = memberService.getLoginMember();
        if(member.getId()!=findAnswer.get().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }
    private void verifyArticle(Long articleId) {
        Optional<Article> findArticle =articleRepository.findById(articleId);
        findArticle.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    private Optional<Member> verifyMember(Long memberId) {
        Optional<Member> findMember =memberRepository.findById(memberId);
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
    private void verifyProject(Long projectId) {
        Optional<Project> findProject =projectRepository.findById(projectId);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
    }

}
