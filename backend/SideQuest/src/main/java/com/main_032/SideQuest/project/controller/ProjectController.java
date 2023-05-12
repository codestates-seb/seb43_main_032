package com.main_032.SideQuest.project.controller;

import com.main_032.SideQuest.auth.utils.CustomAuthorityUtils;
import com.main_032.SideQuest.member.dto.GetLoginMemberResponseDto;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.ProjectDto;
import com.main_032.SideQuest.project.service.ProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project")
@Api(tags = {"Project"}, description = "프로젝트 API")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @ApiOperation(value = "페이징을 이용한 프로젝트 조회")
    @GetMapping("")
    public ResponseEntity<Page<ProjectDto>> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ProjectDto> projectPage = projectService.getProject(page, size);
        return ResponseEntity.ok(projectPage);
    }

    @ApiOperation(value = "ID로 프로젝트 조회")
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id) {
        ProjectDto project = projectService.getProject(id);
        return ResponseEntity.ok(project);
    }

    @ApiOperation(value = "ID로 프로젝트 수정")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        projectService.updateProject(id, projectDto);
        return ResponseEntity.ok().build();
    }

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
}