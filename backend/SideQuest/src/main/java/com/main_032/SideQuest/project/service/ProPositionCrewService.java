package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProPositionCrewPostDto;
import com.main_032.SideQuest.project.entity.ProPositionCrew;
import com.main_032.SideQuest.project.mapper.ProPositionCrewMapper;
import com.main_032.SideQuest.project.repository.ProPositionCrewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProPositionCrewService {

    private final ProPositionCrewRepository proPositionCrewRepository;
    private final ProPositionCrewMapper proPositionCrewMapper;
    public void postPositionCrew(ProPositionCrewPostDto proPositionCrewPostDto,
                                 Long projectId) {
        List<ProPositionCrew> proPositionCrewList = proPositionCrewMapper.proPositionCrewPostDtoToProPositionCrewList(proPositionCrewPostDto, projectId);
        for (int i = 0; i < proPositionCrewList.size(); i++) {

            proPositionCrewRepository.save(proPositionCrewList.get(i));

        }
    }
}
