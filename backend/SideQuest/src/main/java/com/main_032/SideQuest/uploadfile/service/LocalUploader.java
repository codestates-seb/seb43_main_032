package com.main_032.SideQuest.uploadfile.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Slf4j
public class LocalUploader implements Uploader {

    @Override
    public String[] upload(MultipartFile file) throws IOException {
        return new String[]{upload(file, ""), "LOCAL"};
    }

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        // MultipartFile을 File로 변환
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return upload(uploadFile, dirName);
    }

    private String upload(File uploadFile, String dirName) {
        // 파일 경로 및 이름 설정
        String fileName = dirName + "/" + uploadFile.getName();
        // 로컬에 파일 업로드
        String uploadImageUrl = putLocal(uploadFile, fileName);
        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    private String putLocal(File uploadFile, String fileName) {
        // 파일의 URL 주소 생성
        String baseUrl = "http://localhost:8080/images";
        return baseUrl  + fileName;
    }


    private void removeNewFile(File targetFile) {
        // 새로 생성된 파일 삭제
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        // MultipartFile을 File로 변환하는 메서드
        File convertFile = new File("./src/main/resources/static/images/" + Objects.requireNonNull(file.getOriginalFilename()));
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}

/*

LocalUploader 클래스는 Uploader 인터페이스를 구현하고 있습니다.
upload 메서드는 MultipartFile을 받아서 파일을 업로드하고 업로드된 파일의 URL 주소를 반환합니다.
upload(MultipartFile multipartFile, String dirName) 메서드는 MultipartFile을 File로 변환한 뒤 파일을 업로드하고 URL 주소를 반환합니다.
upload(File uploadFile, String dirName) 메서드는 업로드할 파일 경로와 이름을 설정한 뒤 로컬에 파일을 업로드하고 URL 주소를 생성하여 반환합니다.
putLocal(File uploadFile, String fileName) 메서드는 업로드된 파일의 URL 주소를 생성합니다. 여기서는 http://localhost:8080/images를 기본 URL로 사용하고 파일 경로 및 이름을 추가합니다.
removeNewFile(File targetFile) 메서드는 업로드 과정에서 생성된 임시 파일을 삭제하는 메서드입니다.
targetFile.delete()를 사용하여 파일을 삭제하고, 삭제가 성공한 경우 "파일이 삭제되었습니다." 로그를 출력합니다.
삭제가 실패한 경우 "파일이 삭제되지 못했습니다." 로그를 출력합니다.
convert(MultipartFile file) 메서드는 MultipartFile을 File로 변환하는 메서드입니다.
File convertFile = new File("./src/main/resources/static/images/" + Objects.requireNonNull(file.getOriginalFilename()))을 사용하여 변환된 파일의 저장 경로와 이름을 설정합니다.
convertFile.createNewFile()을 호출하여 새로운 파일을 생성합니다.
파일이 성공적으로 생성된 경우, FileOutputStream을 사용하여 MultipartFile의 데이터를 파일에 기록합니다.
변환된 파일을 Optional 객체로 감싸서 반환합니다. 파일이 성공적으로 생성되지 않은 경우 Optional.empty()를 반환합니다.
이렇게 LocalUploader 클래스는 MultipartFile을 로컬 파일로 변환하고 로컬에 업로드하여 URL 주소를 생성하는 기능을 제공합니다.

 */
