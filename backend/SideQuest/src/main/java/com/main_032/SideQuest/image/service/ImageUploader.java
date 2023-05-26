package com.main_032.SideQuest.image.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageUploader {
    String[] uploadImage(MultipartFile file) throws IOException;
}
// ImageUploader: 이미지 업로드를 처리하는 서비스 인터페이스입니다.
// MultipartFile을 받아서 이미지를 업로드하고, URL을 반환합니다.