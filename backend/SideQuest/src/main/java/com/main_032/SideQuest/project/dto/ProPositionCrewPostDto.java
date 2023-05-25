package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;
@Getter
public class ProPositionCrewPostDto {
    @NotBlank
    private List<String> positionList;
    @NotBlank
    private List<Integer> positionNumberList;

}
