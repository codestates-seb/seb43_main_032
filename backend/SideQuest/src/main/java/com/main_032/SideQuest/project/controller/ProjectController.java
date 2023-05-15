package com.main_032.SideQuest.project.controller;

import com.main_032.SideQuest.project.dto.ProjectPostDto;
import com.main_032.SideQuest.project.service.ProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/project")
@Api(tags = {"Project"}, description = "프로젝트 API")
public class ProjectController {


    private ProjectService projectService;

    @ApiOperation(value = "프로젝트 생성")
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody ProjectPostDto projectPostDto) {
        projectService.postProject(projectPostDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

   /* @ApiOperation(value = "프로젝트 조회")
    @PostMapping("")
    public ResponseEntity<ProjectPostDto> getPtoject(@RequestBody )
    */

    /*

    @ApiOperation(value = "페이징을 이용한 프로젝트 조회")
    @GetMapping("")
    public ResponseEntity<Page<ProjectPostDto>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ProjectPostDto> projectPage = projectService.getProject(page, size);
        return ResponseEntity.ok(projectPage);
    }

    @ApiOperation(value = "ID로 프로젝트 조회")
    @GetMapping("/{id}")
    public ResponseEntity<ProjectPostDto> getProject(@PathVariable Long id) {
        ProjectPostDto project = projectService.getProject(id);
        return ResponseEntity.ok(project);
    }

    @ApiOperation(value = "ID로 프로젝트 수정")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateProject(@PathVariable Long id, @RequestBody ProjectPostDto projectPostDto) {
        projectService.updateProject(id, projectPostDto);
        return ResponseEntity.ok().build();

    @ApiOperation(value = "ID로 프로젝트 내 직업 상태 업데이트")
    @PostMapping("/{id}/job")
    public ResponseEntity<Void> updateJobStatus(@PathVariable Long id, @RequestBody JobStatusDto jobStatusDto) {
        projectService.updateJobStatus(id, jobStatusDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "ID로 프로젝트 내 하트 상태 업데이트")
    @PostMapping("/{id}/heart")
    public ResponseEntity<Void> updateHeartStatus(@PathVariable Long id, @RequestBody HeartStatusDto heartStatusDto) {
        projectService.updateHeartStatus(id, heartStatusDto);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "ID로 프로젝트 상태 업데이트")
    @PostMapping("/{id}/state")
    public ResponseEntity<Void> updateProjectState(@PathVariable Long id, @RequestBody StateDto stateDto) {
        projectService.updateProjectState(id, stateDto);
        return ResponseEntity.ok().build();


    }


    }*/
}