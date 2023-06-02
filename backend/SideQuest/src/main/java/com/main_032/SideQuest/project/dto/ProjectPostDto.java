package com.main_032.SideQuest.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
public class ProjectPostDto {
    @NotBlank(message = "제목 입력하세요")
    private String title;
    @NotBlank(message = "내용 입력하세요")
    private String content;
    @NotBlank(message = "작성자 포지션 입력하세요")
    private String writerPosition;
    @NotBlank(message = "프로젝트 시작일 입력하세요")
    private String startDate;
    private String endDate;

    private String thumbnailImageUrl;
    @NotNull(message = "기술 스택 입력하세요")
    private ProTechStackPostDto techList;
    @NotNull(message = "분야 입력하세요")
    private ProFieldPostDto fieldList;
    @NotNull(message = "포지션,인원 입력하세요")
    private ProPositionCrewPostDto positionCrewList;
}
