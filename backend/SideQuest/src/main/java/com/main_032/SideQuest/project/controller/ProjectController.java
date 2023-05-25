package com.main_032.SideQuest.project.controller;

import com.main_032.SideQuest.community.dto.answer.AnswerResponseDto;
import com.main_032.SideQuest.community.dto.comment.CommentResponseDto;
import com.main_032.SideQuest.community.service.AnswerService;
import com.main_032.SideQuest.community.service.CommentService;
import com.main_032.SideQuest.project.dto.*;
import com.main_032.SideQuest.project.service.ProjectService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Api(tags = {"Projects"}, description = "프로젝트 API")
@AllArgsConstructor
@Validated
public class ProjectController {

    private final ProjectService projectService;
    private final AnswerService answerService;
    private final CommentService commentService;

    @ApiOperation(value = "프로젝트 생성")
    @PostMapping("/projects")
    public ResponseEntity<Void> postProject(@Valid @RequestBody ProjectPostDto projectPostDto) {
        projectService.postProject(projectPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 수정")
    @PatchMapping("/projects/{projectId}")
    public ResponseEntity<Void> updateProject(@PathVariable(name = "projectId") @Positive Long projectId, @Valid @RequestBody ProjectPatchDto projectPatchDto) {
        projectService.updateProject(projectId, projectPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 상세 조회")
    @GetMapping("/projects/{projectId}")
    public ResponseEntity<SingleResponseDto<ProjectGetResponseDto>> getProject(@PathVariable(name = "projectId") @Positive Long projectId) {
        SingleResponseDto<ProjectGetResponseDto> singleResponseDto = projectService.getProject(projectId);
        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 리스트 조회")
    @GetMapping("/projects/findAll")
    public ResponseEntity<MultiResponseDto<ProjectGetResponseDto>> getAllProjects(@RequestParam int page, @RequestParam int size) {
        MultiResponseDto<ProjectGetResponseDto> multiResponseDto = projectService.getAllProjects(page - 1, size);
        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 삭제")
    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable(name = "projectId") @Positive Long projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원")
    @PostMapping("/projects/{projectId}/apply")
    public ResponseEntity<Void> applyProject(@PathVariable(name = "projectId") @Positive Long projectId, @Valid @RequestBody ProjectApplyPostDto projectApplyPostDto) {
        projectService.applyProject(projectId, projectApplyPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원 취소")
    @PostMapping("/projects/{projectId}/cancel-apply")
    public ResponseEntity<Void> cancelApplyProject(@PathVariable(name = "projectId") @Positive Long projectId, @Valid @RequestBody ProjectCancelApplyPostDto projectCancelApplyPostDto) {
        projectService.cancelApply(projectId, projectCancelApplyPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "수락 된 지원자 지원 취소")
    @PostMapping("/projects/{projectId}/cancel-accepted-apply")
    public ResponseEntity<Void> cancelAcceptedApply(@PathVariable(name = "projectId") @Positive Long projectId, @Valid @RequestBody ProCancelAcceptedApplyDto proCancelAcceptedApplyDto) {
        projectService.cancelAcceptedApply(projectId, proCancelAcceptedApplyDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원자 리스트 조회")
    @GetMapping("/projects/{projectId}/applicant-list")
    public ResponseEntity<SingleResponseDto<List<ProApplyCrewResponseDto>>> getApplyCrewList(@PathVariable(name = "projectId") @Positive Long projectId) {
        List<ProApplyCrewResponseDto> proApplyCrewResponseDtoList = projectService.getApplyCrewList(projectId);
        SingleResponseDto<List<ProApplyCrewResponseDto>> singleResponseDto = new SingleResponseDto<>(proApplyCrewResponseDtoList);
        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원자 수락")
    @PostMapping("/projects/{projectId}/accept/{memberId}")
    public ResponseEntity<Void> acceptApplicant(@PathVariable(name = "projectId") Long projectId, @PathVariable(name = "memberId") @Positive Long memberId) {
        projectService.acceptApplicant(projectId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원자 거절")
    @PostMapping("/projects/{projectId}/reject/{memberId}")
    public ResponseEntity<Void> rejectApplicant(@PathVariable(name = "projectId") Long projectId, @PathVariable(name = "memberId") @Positive Long memberId) {
        projectService.rejectApplicant(projectId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 상태 변경")
    @PostMapping("/projects/{projectId}/status")
    public ResponseEntity<Void> updateProjectStatus(@PathVariable(name = "projectId") @Positive Long projectId, @Valid @RequestBody ProUpdateStatusDto proUpdateStatusDto) {
        projectService.updateProjectStatus(projectId, proUpdateStatusDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "조회수 TOP 5 프로젝트 조회")
    @GetMapping("/projects/views-top5")
    public ResponseEntity<SingleResponseDto<ProjectViewsTop5Dto>> getViewsTop5Project() {
        ProjectViewsTop5Dto projectViewsTop5Dto = projectService.getViewsTop5Project();

        return new ResponseEntity<>(new SingleResponseDto(projectViewsTop5Dto), HttpStatus.OK);
    }

    @ApiOperation(value = "좋아요 TOP 5 프로젝트 조회")
    @GetMapping("/projects/likes-top5")
    public ResponseEntity<SingleResponseDto<ProjectLikesTop5Dto>> getLikesTop5Project() {
        ProjectLikesTop5Dto projectLikesTop5Dto = projectService.getLikesTop5Project();
        return new ResponseEntity<>(new SingleResponseDto<ProjectLikesTop5Dto>(projectLikesTop5Dto), HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 답글 조회")
    @GetMapping("/projects/{projectId}/answers")
    public ResponseEntity<MultiResponseDto<AnswerResponseDto>> getProjectAnswers(
            @PathVariable("projectId") @Positive Long projectId,
            @RequestParam int page,
            @RequestParam int size) {
        MultiResponseDto<AnswerResponseDto> answerPage = answerService.findAllProjectAnswer(projectId, page - 1, size);
        return ResponseEntity.ok(answerPage);
    }

    @ApiOperation(value = "프로젝트 댓글 조회")
    @GetMapping("/projects/{projectId}/answers/{answerId}/comments")
    public ResponseEntity<MultiResponseDto<CommentResponseDto>> listProjectComments(@PathVariable("answerId") @Positive Long answerId,
                                                                                    @RequestParam int page,
                                                                                    @RequestParam int size) {
        MultiResponseDto<CommentResponseDto> response = commentService.getProjectComments(answerId, page - 1, size);
        return ResponseEntity.ok(response);
    }
}