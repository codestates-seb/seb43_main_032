package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProFieldPostDto;
import com.main_032.SideQuest.project.entity.ProField;
import com.main_032.SideQuest.project.mapper.ProFieldMapper;
import com.main_032.SideQuest.project.repository.ProFieldRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProFieldService {

    private final ProFieldRepository proFieldRepository;
    private final ProFieldMapper proFieldMapper;

    public void postField(ProFieldPostDto proFieldPostDto,
                          Long projectId) {

        List<ProField> proFieldList = proFieldMapper.proFieldPostDtoToProFieldList(proFieldPostDto, projectId);
        for (int i = 0; i < proFieldList.size(); i++) {

            proFieldRepository.save(proFieldList.get(i));

        }

    }

}
