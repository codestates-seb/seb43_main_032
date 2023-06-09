package com.main_032.SideQuest.community.service;

import com.main_032.SideQuest.article.entity.Article;
import com.main_032.SideQuest.article.repository.ArticleRepository;
import com.main_032.SideQuest.community.dto.answer.AnswerInfoResponseDto;
import com.main_032.SideQuest.community.dto.answer.AnswerPatchDto;
import com.main_032.SideQuest.community.dto.answer.AnswerResponseDto;
import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.mapper.AnswerMapper;
import com.main_032.SideQuest.community.repository.AnswerRepository;
import com.main_032.SideQuest.community.dto.answer.AnswerPostDto;
import com.main_032.SideQuest.community.entity.Answer;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.repository.ProjectRepository;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final AnswerMapper mapper;
    private final ArticleRepository articleRepository;
    private final ProjectRepository projectRepository;

    public AnswerService(AnswerRepository answerRepository, MemberService memberService, AnswerMapper mapper, ArticleRepository articleRepository, ProjectRepository projectRepository) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.mapper = mapper;
        this.articleRepository = articleRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void createAnswer(AnswerPostDto answerPostDto) {
        //검증 :,Article,project
        Answer answer = mapper.AnswerPostDtoToAnswer(answerPostDto, memberService.getLoginMember().getId());
        answerRepository.save(answer);
        PlusAnswer(answer);
    }

    @Transactional
    public void updateAnswer(Long answerId, AnswerPatchDto answerPatchDto) {
        //답글 존재 여부 확인
        Optional<Answer> findAnswer = verifyAnswer(answerId);
        //멤버 ID 매치 확인
        memberMatchId(findAnswer);
        Answer answer = findAnswer.get();
        if (answer.getCategory() != Category.ARTICLE) { //프로젝트일때
            verifyProject(answer.getProjectId());
        } else {
            verifyArticle(answer.getArticleId());
        }
        answer = mapper.AnswerPatchDtoToAnswer(answer, answerPatchDto);
        answerRepository.save(answer);
    }

    @Transactional
    public void deleteAnswer(Long answerId) {
        Optional<Answer> findAnswer = verifyAnswer(answerId);
        memberMatchId(findAnswer);
        Answer answer = findAnswer.get();
        answer.delete();
        answerRepository.save(answer);
        minusAnswer(answer);
    }


    public MultiResponseDto<AnswerResponseDto> findAllArticleAnswer(Long articleId, int page, int size) {
        Page<Answer> answerPage = answerRepository.findAllArticleAnswer(articleId, PageRequest.of(page, size, Sort.by("id").descending()));
        List<Answer> answerList = answerPage.getContent();
        List<AnswerResponseDto> answerResponseDtoList = mapper.AnswerListToAnswerResponseDtoList(answerList);
        MultiResponseDto<AnswerResponseDto> response = new MultiResponseDto<AnswerResponseDto>(answerResponseDtoList, answerPage);
        return response;
    }

    public MultiResponseDto<AnswerResponseDto> findAllProjectAnswer(Long projectId, int page, int size) {
        Page<Answer> answerPage = answerRepository.findAllProjectAnswer(projectId, PageRequest.of(page, size, Sort.by("id").descending()));
        List<Answer> answerList = answerPage.getContent();
        List<AnswerResponseDto> answerResponseDtoList = mapper.AnswerListToAnswerResponseDtoList(answerList);
        MultiResponseDto<AnswerResponseDto> response = new MultiResponseDto<AnswerResponseDto>(answerResponseDtoList, answerPage);
        return response;
    }

    private Optional<Answer> verifyAnswer(Long Id) {
        Optional<Answer> findAnswer = answerRepository.findById(Id);
        findAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    private Long memberMatchId(Optional<Answer> findAnswer) {
        Member member = memberService.getLoginMember();
        if (member.getId() != findAnswer.get().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
        return member.getId();
    }

    private void verifyArticle(Long articleId) {
        Optional<Article> findArticle = articleRepository.findById(articleId);
        findArticle.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    private void verifyProject(Long projectId) {
        Optional<Project> findProject = projectRepository.findById(projectId);
        findProject.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
    }

    public Answer getAnswerById(Long answerId) {
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        Answer answer = findAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return answer;
    }

    @Transactional
    public void plusTotalLikes(Long answerId) {
        Answer answer = getAnswerById(answerId);
        answer.plusTotalLikes();
        answerRepository.save(answer);
    }

    @Transactional
    public void minusTotalLikes(Long answerId) {
        Answer answer = getAnswerById(answerId);
        answer.minusTotalLikes();
        answerRepository.save(answer);
    }

    @Transactional
    private void PlusAnswer(Answer answer) {
        if (answer.getCategory().equals(Category.ARTICLE)) {
            Optional<Article> findArticle = articleRepository.findById(answer.getArticleId());
            Article article = findArticle.get();
            article.updateTotalAnswers(article.getTotalAnswers() + 1);
            articleRepository.save(article);
        } else {
            Optional<Project> findProject = projectRepository.findById(answer.getProjectId());
            Project project = findProject.get();
            project.updateTotalAnswers(project.getTotalAnswers() + 1);
            projectRepository.save(project);
        }
    }

    @Transactional
    private void minusAnswer(Answer answer) {
        if (answer.getCategory().equals(Category.ARTICLE)) {
            Optional<Article> findArticle = articleRepository.findById(answer.getArticleId());
            Article article = findArticle.get();
            article.updateTotalAnswers(article.getTotalAnswers() - 1);
            articleRepository.save(article);
        } else {
            Optional<Project> findProject = projectRepository.findById(answer.getProjectId());
            Project project = findProject.get();
            project.updateTotalAnswers(project.getTotalAnswers() - 1);
            projectRepository.save(project);
        }
    }

    public MultiResponseDto<AnswerInfoResponseDto> getMyAnswers() {
        Member member=memberService.getLoginMember();
        Pageable pageable = PageRequest.of(0,4);
        Page<Answer> answerPage = answerRepository.findAllMyAnswer(member.getId(),pageable);
        List<Answer> answerList = answerPage.getContent();
        List<AnswerInfoResponseDto> answerInfoResponseDtoList = new ArrayList<>();
        for(Answer answer: answerList){
            AnswerInfoResponseDto answerInfoResponseDto = mapper.answerToanswerInfoResponseDto(answer);
            answerInfoResponseDtoList.add(answerInfoResponseDto);
        }
        MultiResponseDto<AnswerInfoResponseDto> multiResponse = new MultiResponseDto<AnswerInfoResponseDto>(answerInfoResponseDtoList,answerPage);
        return multiResponse;
    }
}
