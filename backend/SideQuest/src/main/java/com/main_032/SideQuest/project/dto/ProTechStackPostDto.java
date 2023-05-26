package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Getter
public class ProTechStackPostDto {
    @NotBlank(message = "기술 스택 입력하세요")
    private List<String> techList;

}
