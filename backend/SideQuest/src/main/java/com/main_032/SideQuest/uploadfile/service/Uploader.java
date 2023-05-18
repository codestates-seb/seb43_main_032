package com.main_032.SideQuest.uploadfile.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface Uploader {
    /**
     * 파일을 업로드합니다.
     *
     * @param file 업로드할 파일
     * @return 업로드된 파일의 정보 배열 (주소, 버킷 이름 등)
     * @throws IOException 파일 업로드 중 발생한 예외
     */
    String[] upload(MultipartFile file) throws IOException;
}

/*

이 코드는 Uploader 인터페이스를 정의합니다. 주요 내용은 다음과 같습니다:

upload 메서드는 MultipartFile을 업로드하는 기능을 정의합니다.
file 파라미터는 업로드할 파일을 나타냅니다.
String[] 형태의 반환값은 업로드된 파일의 정보를 나타내는 배열입니다. 이 배열은 업로드된 파일의 주소, 버킷 이름 등과 같은 정보를 포함할 수 있습니다.
IOException은 파일 업로드 중에 발생할 수 있는 예외입니다. 이 예외를 처리할 수 있도록 throws 키워드로 선언되어 있습니다.
Uploader 인터페이스는 파일 업로드 기능을 추상화하여 다양한 업로드 서비스를 구현할 때 일관된 방식으로 사용할 수 있도록 합니다. 각 업로드 서비스는 Uploader 인터페이스를 구현하여 upload 메서드를 자신의 업로드 로직에 맞게 구현합니다.

 */