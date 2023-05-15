package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.project.dto.ProPositionCrewPostDto;
import com.main_032.SideQuest.project.entity.ProPositionCrew;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ProPositionCrewMapper {

    public List<ProPositionCrew> proPositionCrewPostDtoToProPositionCrewList
            (ProPositionCrewPostDto proPositionCrewPostDto, Long projectId) {


        List<ProPositionCrew> proPositionCrewList = new ArrayList<>();
        for (int i = 0; i < proPositionCrewPostDto.getPositionCrewList().size(); i++) {

            ProPositionCrew proPositionCrew = new ProPositionCrew(projectId,
                    proPositionCrewPostDto.getPositionCrewList().get(i));
            proPositionCrewList.add(proPositionCrew);
        }
        return proPositionCrewList;

    }

}
