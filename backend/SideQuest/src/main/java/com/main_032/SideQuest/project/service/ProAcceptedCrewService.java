package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProAcceptedCrewResponseDto;
import com.main_032.SideQuest.project.entity.ProAcceptedCrew;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProAcceptedCrewService {
    public List<ProAcceptedCrewResponseDto> proAcceptedCrewToProAcceptedCrewDtoList(List<ProAcceptedCrew> proAcceptedCrewList) {
        List<ProAcceptedCrewResponseDto> proAcceptedCrewResponseDtoList = new ArrayList<>();
        for (int i = 0; i < proAcceptedCrewList.size(); i++) {
            ProAcceptedCrewResponseDto proAcceptedCrewResponseDto = new ProAcceptedCrewResponseDto(proAcceptedCrewList.get(i).getProject().getId(),
                    proAcceptedCrewList.get(i).getMemberId(), proAcceptedCrewList.get(i).getPosition());
            proAcceptedCrewResponseDtoList.add(proAcceptedCrewResponseDto);
        }
        return proAcceptedCrewResponseDtoList;
    }
}
