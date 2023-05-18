package com.main_032.SideQuest.image.service;

import com.main_032.SideQuest.image.entity.ImageEntity;
import com.main_032.SideQuest.image.repository.JpaImageRepository;
import com.main_032.SideQuest.member.entity.Member;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.uploadfile.service.Uploader;
import com.main_032.SideQuest.util.exception.CustomLogicException;
import com.main_032.SideQuest.util.exception.ExceptionCode;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Transactional
public class ImageUploadService implements ImageUploader {

    private final Uploader uploader;
    private final JpaImageRepository jpaImageRepository;
    private final MemberService memberService;

    public ImageUploadService(Uploader uploader, JpaImageRepository jpaImageRepository, MemberService memberService) {
        this.uploader = uploader;
        this.jpaImageRepository = jpaImageRepository;
        this.memberService = memberService;
    }

    @Override
    public String uploadImage(MultipartFile file, String email) throws IOException {
        // 파일 유효성 검사 후 업로드
        if (file == null || file.isEmpty()) {
            throw new CustomLogicException(ExceptionCode.FILE_NOT_SUPPORTED);
        }
        String[] info = uploadImage(file);
        ImageEntity imageEntity = ImageEntity.builder()
                .bucket(info[1])
                .url(info[0])
                .build();
        // 해당 사용자의 프로필 이미지 정보 업데이트
        Member member = memberService.findMember(email);
        if (member.getImgUrl() != null) {
            jpaImageRepository.delete(member.getImgUrl());
        }
        member.setImgUrl(imageEntity);
        jpaImageRepository.save(imageEntity);
        memberService.updateMemberCache(member);
        return imageEntity.getUrl();

    }

    // 이미지 파일 유효성 검사 후 업로드
    @Override
    public String[] uploadImage(MultipartFile file) throws IOException {
        if (!Objects.requireNonNull(file.getContentType()).startsWith("image")) {
            throw new CustomLogicException(ExceptionCode.FILE_NOT_SUPPORTED);
        }
        return uploader.upload(file);
    }

    /*
     예시: 이미지와 게시글 또는 댓글을 연결하는 로직
     public void associateImageWithPost(ImageEntity imageEntity, Long postId) {
         Post post = postService.getPostById(postId);
         post.setImage(imageEntity);
         postService.savePost(post);
     }
     */

}
// ImageUploadService: 이미지 업로드를 처리하는 서비스 클래스입니다.
// Uploader를 사용하여 이미지를 업로드하고, JpaImageRepository를 사용하여 이미지 정보를 저장합니다.
// MemberService를 통해 사용자 정보를 업데이트합니다.