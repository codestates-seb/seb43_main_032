package com.main_032.SideQuest.project.controller;

import com.main_032.SideQuest.project.dto.ProjectGetResponseDto;
import com.main_032.SideQuest.project.dto.ProjectPatchDto;
import com.main_032.SideQuest.project.dto.ProjectPostDto;
import com.main_032.SideQuest.project.service.ProjectService;
import com.main_032.SideQuest.util.dto.MultiResponseDto;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"Project"}, description = "프로젝트 API")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @ApiOperation(value = "프로젝트 생성")
    @PostMapping("/project/post")
    public ResponseEntity<Void> postProject(@RequestBody ProjectPostDto projectPostDto) {
        projectService.postProject(projectPostDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "프로젝트 수정")
    @PatchMapping("/project/update/{projectId}")
    public ResponseEntity<Void> updateProject(@PathVariable(name = "projectId") Long projectId, @RequestBody ProjectPatchDto projectPatchDto) {
        projectService.updateProject(projectId, projectPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "프로젝트 상세 조회")
    @GetMapping("/project/{projectId}")
    public ResponseEntity<SingleResponseDto<ProjectGetResponseDto>> getProject(@PathVariable(name = "projectId") Long projectId) {
        SingleResponseDto<ProjectGetResponseDto> singleResponseDto = projectService.getProject(projectId);
        ResponseEntity<SingleResponseDto<ProjectGetResponseDto>> responseEntity = new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
        return responseEntity;
    }

    @ApiOperation(value = "프로젝트 리스트 조회")
    @GetMapping("/project/findAll")
    public ResponseEntity<MultiResponseDto<ProjectGetResponseDto>> getAllProjects(@RequestParam int page, @RequestParam int size) {
        MultiResponseDto<ProjectGetResponseDto> multiResponseDto = projectService.getAllProjects(page - 1, size);
        ResponseEntity<MultiResponseDto<ProjectGetResponseDto>> responseEntity = new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
        return responseEntity;
    }
}