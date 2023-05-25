package com.main_032.SideQuest.member.controller;

import com.main_032.SideQuest.article.dto.ArticleInfoResponseDto;
import com.main_032.SideQuest.article.service.ArticleService;
import com.main_032.SideQuest.community.dto.answer.AnswerInfoResponseDto;
import com.main_032.SideQuest.community.dto.comment.CommentInfoResponseDto;
import com.main_032.SideQuest.community.service.AnswerService;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.member.dto.*;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.ProjectInfoResponseDto;
import com.main_032.SideQuest.project.service.ProjectService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Api(tags = {"Members"}, description = "멤버 API")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final AnswerService answerService;
    private final ArticleService articleService;
    private final ProjectService projectService;
    private final CommentService commentService;

    public MemberController(MemberService memberService, AnswerService answerService, ArticleService articleService, ProjectService projectService, CommentService commentService) {
        this.memberService = memberService;
        this.answerService = answerService;
        this.articleService = articleService;
        this.projectService = projectService;
        this.commentService = commentService;
    }

    @ApiOperation(value = "회원 가입") //회원가입
    @PostMapping("/members/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody MemberPostDto memberPostDto) {
        memberService.signup(memberPostDto);
        ResponseEntity responseEntity = new ResponseEntity(HttpStatus.OK);
        return responseEntity;
    }

    // Swagger API 뽑아내기용 함수
    @ApiOperation(value = "로그인")
    @PostMapping("/members/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDto login(@Valid @RequestBody LoginPostDto loginPostDto) {
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        return loginResponseDto;
    }

    @ApiOperation(value = "로그인 멤버 정보 조회")
    @GetMapping("/members/info")
    public ResponseEntity<SingleResponseDto<MemberGetResponseDto>> getLoginMemberInfo() {
        SingleResponseDto<MemberGetResponseDto> singleResponseDto = memberService.getLoginMemberInfo();
        ResponseEntity responseEntity = new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "다른 회원 정보 조회")
    @GetMapping("/members/info/{memberId}")
    public ResponseEntity<SingleResponseDto<MemberGetResponseDto>> getMemberInfo(@PathVariable("memberId") @Positive Long memberId) {
        SingleResponseDto<MemberGetResponseDto> singleResponseDto = memberService.getMemberInfo(memberId);
        ResponseEntity responseEntity = new ResponseEntity(singleResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "멤버 정보 수정")
    @PatchMapping("/members")
    public ResponseEntity<Void> updateMember(@RequestBody MemberPatchDto memberPatchDto) {
        memberService.updateMember(memberPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "멤버 리스트 조회")
    @GetMapping("/members/find-all")
    public ResponseEntity<MultiResponseDto<MemberGetResponseDto>> getAllMembers(@RequestParam int page, @RequestParam int size) {
        MultiResponseDto<MemberGetResponseDto> multiResponseDto = memberService.getAllMembers(page - 1, size);
        ResponseEntity<MultiResponseDto<MemberGetResponseDto>> responseEntity = new ResponseEntity(multiResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "멤버 탈퇴")
    @DeleteMapping("/members")
    public ResponseEntity deleteMember() {
        memberService.deleteMember();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "별점 추가")
    @PostMapping("/members/stars")
    public ResponseEntity<Void> plusStar(@Valid @RequestBody StarPostDto starPostDto) {
        memberService.plusStar(starPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "내가 작성한 답변 조회")
    @GetMapping("members/info/answers")
    public ResponseEntity<MultiResponseDto<AnswerInfoResponseDto>> getAllMyAnswers(){
        MultiResponseDto<AnswerInfoResponseDto> response = answerService.getMyAnswers();
        return ResponseEntity.ok(response);
    }
    @ApiOperation(value = "내가 작성한 프로젝트 조회")
    @GetMapping("members/info/projects")
    public ResponseEntity<MultiResponseDto<ProjectInfoResponseDto>> getAllMyProjects(){
        MultiResponseDto<ProjectInfoResponseDto> response = projectService.getMyProjects();
        return ResponseEntity.ok(response);
    }
    @ApiOperation(value = "내가 작성한 게시글 조회")
    @GetMapping("members/info/articles")
    public ResponseEntity<MultiResponseDto<ArticleInfoResponseDto>> getAllMyArticles(){
        MultiResponseDto<ArticleInfoResponseDto> response = articleService.getMyArticles();
        return ResponseEntity.ok(response);
    }
    @ApiOperation(value = "내가 작성한 댓글 조회")
    @GetMapping("members/info/comments")
    public ResponseEntity<MultiResponseDto<CommentInfoResponseDto>> getAllMyComments(){
        MultiResponseDto<CommentInfoResponseDto> response = commentService.getMyComments();
        return ResponseEntity.ok(response);
    }

}
