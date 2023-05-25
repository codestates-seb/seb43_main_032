package com.main_032.SideQuest.project.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Getter
public class ProFieldPostDto {
    @NotBlank
    private List<String> fieldList;
}
