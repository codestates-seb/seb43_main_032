package com.main_032.SideQuest.image.controller;

import com.main_032.SideQuest.image.service.ImageUploader;
import com.main_032.SideQuest.image.dto.SingleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {
    private final ImageUploader imageUploader;

    public ImageController(ImageUploader imageUploader) {
        this.imageUploader = imageUploader;
    }

    @PostMapping("/profile")
    public ResponseEntity profileImage(@RequestParam MultipartFile file, @AuthenticationPrincipal User principal) throws IOException {
        //imageUploader.uploadImage(file , principal.getUsername());
        return new ResponseEntity(new SingleResponse<>(imageUploader.uploadImage(file, principal.getUsername())), null, 200);
    }
/*
    //예시 dto클래스 변경 필요 해당 정보를 담는 dto클래스 정의해야함, service클래스: imageUploader등의 인터페이스 구현 필요,
    //예외 처리: 새로운 엔드포인트에서 발생할 수 있는 예외 상황에 대한 처리가 필요할 수 있습니다. 이에 따라 예외 처리를 담당하는 클래스에서 새로운 예외 상황에 대한 처리를 추가해야 합니다.
    //유효성 검사: 업로드된 이미지에 대한 유효성 검사를 수행해야 할 수도 있습니다. 예를 들어, 이미지 크기, 형식, 파일명 등을 검사하여 유효한 이미지인지 확인하는 로직을 추가해야 할 수 있습니다.
    @PostMapping("/article")
    public ResponseEntity uploadArticleImage(@RequestParam MultipartFile file) throws IOException {
        //imageUploader.uploadImage(file, "article"); // article 이미지 업로드
        return new ResponseEntity(new SingleResponse<>(imageUploader.uploadImage(file, "article")), null, 200);
    }

    @PostMapping("/comment")
    public ResponseEntity uploadCommentImage(@RequestParam MultipartFile file) throws IOException {
        //imageUploader.uploadImage(file, "comment"); // comment 이미지 업로드
        return new ResponseEntity(new SingleResponse<>(imageUploader.uploadImage(file, "comment")), null, 200);
    }
*/
}

// ImageController: 이미지 업로드를 처리하는 컨트롤러 클래스입니다.
// POST /api/v1/images/profile 경로로 프로필 이미지 업로드를 처리합니다.
// ImageUploader를 사용하여 이미지를 업로드하고, 업로드된 이미지의 URL을 반환합니다.
// 현재 인증된 사용자의 정보를 받아와서 해당 사용자의 프로필 이미지로 업로드합니다.
