package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProFieldPostDto;
import com.main_032.SideQuest.project.entity.ProField;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProFieldMapper {

    public List<ProField> proFieldPostDtoToProFieldList (Project project, ProFieldPostDto proFieldPostDto) {
        List<ProField> proFieldList = new ArrayList<>();
        for (int i = 0; i < proFieldPostDto.getFiledList().size(); i++) {
            ProField proField = new ProField(project, proFieldPostDto.getFiledList().get(i));
            proFieldList.add(proField);
        }
        return proFieldList;
    }
}
