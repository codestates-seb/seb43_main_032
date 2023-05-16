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

}