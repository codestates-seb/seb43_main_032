package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;
@Getter
public class ProPositionCrewPostDto {
    @NotBlank(message = "직업군 입력하세요")
    private List<String> positionList;
    @NotBlank(message = "인원 입력하세요")
    private List<Integer> positionNumberList;

}
