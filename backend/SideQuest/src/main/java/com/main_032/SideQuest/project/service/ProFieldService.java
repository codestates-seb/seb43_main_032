package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProFieldPostDto;
import com.main_032.SideQuest.project.dto.ProFieldResponseDto;
import com.main_032.SideQuest.project.entity.ProField;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.project.mapper.ProFieldMapper;
import com.main_032.SideQuest.project.repository.ProFieldRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProFieldService {

    private final ProFieldRepository proFieldRepository;
    private final ProFieldMapper proFieldMapper;

    @Transactional
    public void postField(Project project, ProFieldPostDto proFieldPostDto) {
        List<ProField> proFieldList = proFieldMapper.proFieldPostDtoToProFieldList(project, proFieldPostDto);
        for (int i = 0; i < proFieldList.size(); i++) {
            proFieldRepository.save(proFieldList.get(i));
        }
    }

    @Transactional
    public List<ProField> updateProField(Project project, ProFieldPostDto proFieldPostDto) {
        for (int i = 0; i < project.getProFieldList().size(); i++) {
            proFieldRepository.deleteById(project.getProFieldList().get(i).getId());
        }
        List<ProField> proFieldList = new ArrayList<>();
        for (int i = 0; i < proFieldPostDto.getFieldList().size(); i++) {
            ProField proField = new ProField(project, proFieldPostDto.getFieldList().get(i));
            proFieldRepository.save(proField);
            proFieldList.add(proField);
        }
        return proFieldList;
    }

    public List<ProFieldResponseDto> proFieldListToProFieldResponseDtoList(List<ProField> proFieldList) {
        List<ProFieldResponseDto> proFieldResponseDtoList = new ArrayList<>();
        for (int i = 0; i < proFieldList.size(); i++) {
            ProFieldResponseDto proFieldResponseDto = new ProFieldResponseDto(proFieldList.get(i).getField());
            proFieldResponseDtoList.add(proFieldResponseDto);
        }
        return proFieldResponseDtoList;
    }
}
