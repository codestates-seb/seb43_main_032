package com.main_032.SideQuest.project.service;

import com.main_032.SideQuest.project.dto.ProjectCancelApplyPostDto;
import com.main_032.SideQuest.project.entity.ProApplyCrew;
import com.main_032.SideQuest.project.repository.ProApplyCrewRepository;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProApplyCrewService {
    private final ProApplyCrewRepository proApplyCrewRepository;

    @Transactional
    public void postProApplyCrew(ProApplyCrew proApplyCrew) {
        proApplyCrewRepository.save(proApplyCrew);
    }

    public void cancelApply(Long projectId, Long memberId, ProjectCancelApplyPostDto projectCancelApplyPostDto) {
        Optional<ProApplyCrew> findProApplyCrew = proApplyCrewRepository.findByMemberIdAndProjectIdAndDeleted(memberId, projectId, false);
        findProApplyCrew.orElseThrow(() -> new BusinessLogicException(ExceptionCode.APPLY_CREW_NOT_FOUND));
        ProApplyCrew proApplyCrew = findProApplyCrew.get();

        if(proApplyCrew.getPosition().equals(projectCancelApplyPostDto.getPosition())) {
            proApplyCrew.updateDeleted(true);
        } else {
            throw new BusinessLogicException(ExceptionCode.APPLY_CREW_POSITION_NOT_MATCH);
        }
        proApplyCrewRepository.save(proApplyCrew);
    }

    public ProApplyCrew getProApplyCrew(Long projectId, Long memberId) {
        Optional<ProApplyCrew> findProApplyCrew = proApplyCrewRepository.findByMemberIdAndProjectIdAndDeleted(memberId, projectId, false);
        findProApplyCrew.orElseThrow(() -> new BusinessLogicException(ExceptionCode.APPLY_CREW_NOT_FOUND));
        ProApplyCrew proApplyCrew = findProApplyCrew.get();
        return proApplyCrew;
    }

    @Transactional
    public void deleteApplyCrew(ProApplyCrew proApplyCrew) {
        proApplyCrew.updateDeleted(true);
        proApplyCrewRepository.save(proApplyCrew);
    }
}
