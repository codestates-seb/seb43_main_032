package com.main_032.SideQuest.image.service;

import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.uploadfile.service.Uploader;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Transactional
public class ImageUploadService implements ImageUploader {

    private final Uploader uploader;
    private final MemberService memberService;

    public ImageUploadService(Uploader uploader, MemberService memberService) {
        this.uploader = uploader;
        this.memberService = memberService;
    }

    // 이미지 파일 유효성 검사 후 업로드
    @Override
    public String[] uploadImage(MultipartFile file) throws IOException {
        // TODO: 2023-05-18 업로드 파일 검증 필요하면 여기에 추가 
//        if (!Objects.requireNonNull(file.getContentType()).startsWith("image")) {
//            throw new CustomLogicException(ExceptionCode.FILE_NOT_SUPPORTED);
//        }
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