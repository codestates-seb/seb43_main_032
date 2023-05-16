package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProTechStackPostDto;
import com.main_032.SideQuest.project.entity.ProTechStack;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProTechStackMapper {

    public List<ProTechStack> proTechStackPostDtoToProTechStackList(Project project, ProTechStackPostDto proTechStackPostDto) {
        List<ProTechStack> proTechStackList = new ArrayList<>();
        for (int i = 0; i < proTechStackPostDto.getTechStackList().size(); i++) {
            ProTechStack proTechStack = new ProTechStack(project, proTechStackPostDto.getTechStackList().get(i));
            proTechStackList.add(proTechStack);
        }
        return proTechStackList;
    }
}
