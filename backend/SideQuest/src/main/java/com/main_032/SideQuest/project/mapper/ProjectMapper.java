package com.main_032.SideQuest.project.mapper;

import com.main_032.SideQuest.community.entity.Category;
import com.main_032.SideQuest.community.entity.Likes;
import com.main_032.SideQuest.community.repository.LikesRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.project.dto.ProjectGetResponseDto;
import com.main_032.SideQuest.project.dto.ProjectPostDto;
import com.main_032.SideQuest.project.entity.Project;
import com.main_032.SideQuest.util.exception.BusinessLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class ProjectMapper {
    MemberService memberService;
    LikesRepository likesRepository;

    public Project projectPostDtoToProject(ProjectPostDto projectPostDto) {
        Project project = new Project(projectPostDto.getTitle(),
                projectPostDto.getContent(),
                projectPostDto.getWriterPosition(),
                projectPostDto.getStartDate(),
                projectPostDto.getEndDate(),
                projectPostDto.getThumbnailImageUrl());
        return project;
    }

    public ProjectGetResponseDto projectToProjectGetResponseDto(Project project) {
        // 작성 여부, 좋아요 여부 확인
        boolean isAuthor = false;
        boolean liked = false;
        if(memberService.isLoginMember() == true) {
            Member member = memberService.getLoginMember();

            if(project.getMemberId() == member.getId()) isAuthor = true;

            Optional<Likes> findLikes = likesRepository.findByMemberIdAndCategoryAndProjectId(member.getId(), Category.PROJECT, project.getId());
            if(findLikes.isEmpty() == false) liked = true;
        }

        ProjectGetResponseDto projectGetResponseDto = new ProjectGetResponseDto(
                project.getId(),
                memberService.getMemberInfo(project.getMemberId()).getData(),
                project.getTitle(),
                project.getContent(),
                project.getWriterPosition(),
                project.getStartDate(),
                project.getEndDate(),
                project.getThumbnailImageUrl(),
                project.getViews(),
                project.getStatus(),
                project.getTotalLikes(),
                isAuthor,
                liked,
                project.getCreatedAt()
        );
        return projectGetResponseDto;
    }
}
