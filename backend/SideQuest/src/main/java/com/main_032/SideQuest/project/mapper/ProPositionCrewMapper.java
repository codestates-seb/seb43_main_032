package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProPositionCrewPostDto;
import com.main_032.SideQuest.project.entity.ProPositionCrew;
import com.main_032.SideQuest.project.entity.Project;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ProPositionCrewMapper {

    public List<ProPositionCrew> proPositionCrewPostDtoToProPositionCrewList(Project project, ProPositionCrewPostDto proPositionCrewPostDto) {
        List<ProPositionCrew> proPositionCrewList = new ArrayList<>();
        for (int i = 0; i < proPositionCrewPostDto.getPositionList().size(); i++) {
            ProPositionCrew proPositionCrew = new ProPositionCrew(project, proPositionCrewPostDto.getPositionList().get(i), proPositionCrewPostDto.getPositionNumberList().get(i));
            proPositionCrewList.add(proPositionCrew);
        }
        return proPositionCrewList;
    }
}
