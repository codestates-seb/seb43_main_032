package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProPositionCrewPostDto;
import com.main_032.SideQuest.project.dto.ProPositionCrewResponseDto;
import com.main_032.SideQuest.project.entity.ProPositionCrew;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.mapper.ProPositionCrewMapper;
import com.main_032.SideQuest.project.repository.ProPositionCrewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProPositionCrewService {
    private final ProPositionCrewRepository proPositionCrewRepository;
    private final ProPositionCrewMapper proPositionCrewMapper;

    @Transactional
    public void postPositionCrew(Project project, ProPositionCrewPostDto proPositionCrewPostDto) {
        List<ProPositionCrew> proPositionCrewList = proPositionCrewMapper.proPositionCrewPostDtoToProPositionCrewList(project, proPositionCrewPostDto);
        for (int i = 0; i < proPositionCrewList.size(); i++) {
            proPositionCrewRepository.save(proPositionCrewList.get(i));
        }
    }

    public List<ProPositionCrew> updateProPositionCrew(Project project, ProPositionCrewPostDto proPositionCrewPostDto) {
        List<ProPositionCrew> proPositionCrewList = new ArrayList<>();
        for (int i = 0; i < proPositionCrewPostDto.getPositionCrewList().size(); i++) {
            ProPositionCrew proPositionCrew = new ProPositionCrew(project, proPositionCrewPostDto.getPositionCrewList().get(i), proPositionCrewPostDto.getPositionNumberList().get(i));
            proPositionCrewList.add(proPositionCrew);
        }
        return proPositionCrewList;
    }

    public List<ProPositionCrewResponseDto> proPositionCrewListToProPositionCrewDtoList(List<ProPositionCrew> proPositionCrewList) {
        List<ProPositionCrewResponseDto> proPositionCrewResponseDtoList = new ArrayList<>();
        for (int i = 0; i < proPositionCrewList.size(); i++) {
            ProPositionCrewResponseDto proPositionCrewResponseDto = new ProPositionCrewResponseDto(proPositionCrewList.get(i).getPosition(),
                    proPositionCrewList.get(i).getNumber(), proPositionCrewList.get(i).getAcceptedNumber());
            proPositionCrewResponseDtoList.add(proPositionCrewResponseDto);
        }
        return proPositionCrewResponseDtoList;
    }
}
