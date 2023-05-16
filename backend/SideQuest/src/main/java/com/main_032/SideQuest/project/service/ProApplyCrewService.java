package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.entity.ProApplyCrew;
import com.main_032.SideQuest.project.repository.ProApplyCrewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class ProApplyCrewService {
    private final ProApplyCrewRepository proApplyCrewRepository;

    @Transactional
    public void postProApplyCrew(ProApplyCrew proApplyCrew) {
        proApplyCrewRepository.save(proApplyCrew);
    }
}
