package com.main_032.SideQuest.project.controller;

import com.main_032.SideQuest.project.dto.*;
import com.main_032.SideQuest.project.service.ProjectService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = {"Project"}, description = "프로젝트 API")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @ApiOperation(value = "프로젝트 생성")
    @PostMapping("/project")
    public ResponseEntity<Void> postProject(@RequestBody ProjectPostDto projectPostDto) {
        projectService.postProject(projectPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 수정")
    @PatchMapping("/project/{project-id}")
    public ResponseEntity<Void> updateProject(@PathVariable(name = "project-id") Long projectId, @RequestBody ProjectPatchDto projectPatchDto) {
        projectService.updateProject(projectId, projectPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 상세 조회")
    @GetMapping("/project/{project-id}")
    public ResponseEntity<SingleResponseDto<ProjectGetResponseDto>> getProject(@PathVariable(name = "project-id") Long projectId) {
        SingleResponseDto<ProjectGetResponseDto> singleResponseDto = projectService.getProject(projectId);
        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 리스트 조회")
    @GetMapping("/project/findAll")
    public ResponseEntity<MultiResponseDto<ProjectGetResponseDto>> getAllProjects(@RequestParam int page, @RequestParam int size) {
        MultiResponseDto<ProjectGetResponseDto> multiResponseDto = projectService.getAllProjects(page - 1, size);
        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 삭제")
    @DeleteMapping("/project/{project-id}")
    public ResponseEntity<Void> deleteProject(@PathVariable(name = "project-id") Long projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원")
    @PostMapping("/project/{project-id}/apply")
    public ResponseEntity<Void> applyProject(@PathVariable(name = "project-id") Long projectId, @RequestBody ProjectApplyPostDto projectApplyPostDto) {
        projectService.applyProject(projectId, projectApplyPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원 취소")
    @PostMapping("/project/{project-id}/cancel-apply")
    public ResponseEntity<Void> cancelApplyProject(@PathVariable(name = "project-id") Long projectId, @RequestBody ProjectCancelApplyPostDto projectCancelApplyPostDto) {
        projectService.cancelApply(projectId, projectCancelApplyPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원자 리스트 조회")
    @GetMapping("/project/{project-id}/applicant-list")
    public ResponseEntity<SingleResponseDto<List<ProApplyCrewResponseDto>>> getApplyCrewList(@PathVariable(name = "project-id") Long projectId) {
        List<ProApplyCrewResponseDto> proApplyCrewResponseDtoList = projectService.getApplyCrewList(projectId);
        SingleResponseDto<List<ProApplyCrewResponseDto>> singleResponseDto = new SingleResponseDto<>(proApplyCrewResponseDtoList);
        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원자 수락")
    @PostMapping("/project/{project-id}/accept/{member-id}")
    public ResponseEntity<Void> acceptApplicant(@PathVariable(name = "project-id") Long projectId, @PathVariable(name = "member-id") Long memberId) {
        projectService.acceptApplicant(projectId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 지원자 거절")
    @PostMapping("/project/{project-id}/reject/{member-id}")
    public ResponseEntity<Void> rejectApplicant(@PathVariable(name = "project-id") Long projectId, @PathVariable(name = "member-id") Long memberId) {
        projectService.rejectApplicant(projectId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 상태 변경")
    @PostMapping("/project/{project-id}/status")
    public ResponseEntity<Void> updateProjectStatus(@PathVariable(name = "project-id") Long projectId, @RequestBody ProUpdateStatusDto proUpdateStatusDto) {
        projectService.updateProjectStatus(projectId, proUpdateStatusDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "조회수 TOP 5 프로젝트 조회")
    @GetMapping("/project/views-top5")
    public ResponseEntity<SingleResponseDto<ProjectViewsTop5Dto>> getViewsTop5Project() {
        ProjectViewsTop5Dto projectViewsTop5Dto = projectService.getViewsTop5Project();

        return new ResponseEntity<>(new SingleResponseDto(projectViewsTop5Dto), HttpStatus.OK);
    }
}