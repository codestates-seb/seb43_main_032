package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProAcceptedCrewResponseDto;
import com.main_032.SideQuest.project.entity.ProAcceptedCrew;
import com.main_032.SideQuest.project.repository.ProAcceptedCrewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProAcceptedCrewService {
    private final ProAcceptedCrewRepository proAcceptedCrewRepository;

    public List<ProAcceptedCrewResponseDto> proAcceptedCrewToProAcceptedCrewDtoList(List<ProAcceptedCrew> proAcceptedCrewList) {
        List<ProAcceptedCrewResponseDto> proAcceptedCrewResponseDtoList = new ArrayList<>();
        for (int i = 0; i < proAcceptedCrewList.size(); i++) {
            if(proAcceptedCrewList.get(i).isDeleted() == true) continue;
            ProAcceptedCrewResponseDto proAcceptedCrewResponseDto = new ProAcceptedCrewResponseDto(proAcceptedCrewList.get(i).getProject().getId(),
                    proAcceptedCrewList.get(i).getMemberId(), proAcceptedCrewList.get(i).getPosition());
            proAcceptedCrewResponseDtoList.add(proAcceptedCrewResponseDto);
        }
        return proAcceptedCrewResponseDtoList;
    }

    public void saveProAcceptedCrew(ProAcceptedCrew proAcceptedCrew) {
        proAcceptedCrewRepository.save(proAcceptedCrew);
    }

    public void deleteAcceptedCrew(ProAcceptedCrew proAcceptedCrew) {
        proAcceptedCrew.updateDeleted(true);
        proAcceptedCrewRepository.save(proAcceptedCrew);
    }
}
