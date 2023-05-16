package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProTechStackPostDto;
import com.main_032.SideQuest.project.entity.ProTechStack;
import com.main_032.SideQuest.project.mapper.ProTechStackMapper;
import com.main_032.SideQuest.project.repository.ProTechStackRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProTechStackService {

    private final ProTechStackRepository proTechStackRepository;
    private final ProTechStackMapper proTechStackMapper;

    public void postTechStack(ProTechStackPostDto proTechStackPostDto,
                              Long projectId) {

        List<ProTechStack> proTechStackList = proTechStackMapper.proTechStackPostDtoToProTechStackList(proTechStackPostDto, projectId);
        for (int i = 0; i < proTechStackList.size(); i++) {

            proTechStackRepository.save(proTechStackList.get(i));

        }
    }
}
//프로젝트id가 갖는 정보를 DB에 저장해줌