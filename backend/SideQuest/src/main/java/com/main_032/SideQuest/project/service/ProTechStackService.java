package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProTechStackPostDto;
import com.main_032.SideQuest.project.dto.ProTechStackResponseDto;
import com.main_032.SideQuest.project.entity.ProTechStack;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.mapper.ProTechStackMapper;
import com.main_032.SideQuest.project.repository.ProTechStackRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProTechStackService {

    private final ProTechStackRepository proTechStackRepository;
    private final ProTechStackMapper proTechStackMapper;

    @Transactional
    public void postTechStack(Project project, ProTechStackPostDto proTechStackPostDto) {
        List<ProTechStack> proTechStackList = proTechStackMapper.proTechStackPostDtoToProTechStackList(project, proTechStackPostDto);
        for (int i = 0; i < proTechStackList.size(); i++) {
            proTechStackRepository.save(proTechStackList.get(i));
        }
    }

    public List<ProTechStack> updateProTechStack(Project project, ProTechStackPostDto proTechStackPostDto) {
        List<ProTechStack> proTechStackList = new ArrayList<>();
        for (int i = 0; i < proTechStackPostDto.getTechList().size(); i++) {
            ProTechStack proTechStack = new ProTechStack(project, proTechStackPostDto.getTechList().get(i));
            proTechStackList.add(proTechStack);
        }
        return proTechStackList;
    }

    public List<ProTechStackResponseDto> proTechStackListToProTechStackResponseDtoList(List<ProTechStack> proTechStackList) {
        List<ProTechStackResponseDto> proTechStackResponseDtoList = new ArrayList<>();
        for (int i = 0; i < proTechStackList.size(); i++) {
            ProTechStackResponseDto proTechStackResponseDto = new ProTechStackResponseDto(proTechStackList.get(i).getTech());
            proTechStackResponseDtoList.add(proTechStackResponseDto);
        }
        return proTechStackResponseDtoList;
    }
}
