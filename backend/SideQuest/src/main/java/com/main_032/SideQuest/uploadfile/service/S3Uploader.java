package com.main_032.SideQuest.uploadfile.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
public class S3Uploader implements Uploader {
   private final AmazonS3 amazonS3Client;

   @Value("${cloud.aws.s3.bucket}")
   private String bucket;
   public S3Uploader(AmazonS3 amazonS3Client) {
      this.amazonS3Client = amazonS3Client;

   }
   @Override
   public String[] upload(MultipartFile file) throws IOException {
      return new String[]{upload(file, "sidequest/" + UUID.randomUUID()),bucket};
   }
   public String upload(MultipartFile multipartFile, String dirName) throws IOException {
      File uploadFile = convert(multipartFile)
              .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
      return upload(uploadFile, dirName);
   }

   private String upload(File uploadFile, String dirName) {
      String fileName = dirName + "/" + uploadFile.getName();
      String uploadImageUrl = putS3(uploadFile, fileName);

      removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

      return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
   }

   private String putS3(File uploadFile, String fileName) {
      amazonS3Client.putObject(
              new PutObjectRequest(bucket, fileName, uploadFile)
                      .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
      );
      return amazonS3Client.getUrl(bucket, fileName).toString();
   }

   private void removeNewFile(File targetFile) {
      // 새로 생성된 파일 삭제
      if(targetFile.delete()) {
         log.info("파일이 삭제되었습니다.");
      }else {
         log.info("파일이 삭제되지 못했습니다.");
      }
   }

   private Optional<File> convert(MultipartFile file) throws IOException {
      // MultipartFile을 File로 변환
      File convertFile = new File("tmp/" + Objects.requireNonNull(file.getOriginalFilename()));
      if(convertFile.createNewFile()) {
         try (FileOutputStream fos = new FileOutputStream(convertFile)) {
            fos.write(file.getBytes());
         }
         return Optional.of(convertFile);
      }
      return Optional.empty();
   }


}
/*

이 코드는 S3Uploader 클래스입니다. 주요 기능은 다음과 같습니다:

AmazonS3 클라이언트를 사용하여 S3에 파일을 업로드하는 역할을 합니다.
bucket은 @Value 어노테이션을 사용하여 설정 파일에서 주입됩니다.
upload 메서드는 MultipartFile을 업로드하고 그 결과로 S3의 URL 주소와 버킷 이름을 반환합니다.
upload(MultipartFile multipartFile, String dirName) 메서드는 MultipartFile을 로컬 파일로 변환하고 S3에 업로드하는 기
능을 수행합니다.

putS3(File uploadFile, String fileName) 메서드는 amazonS3Client.putObject()를 사용하여 S3에 파일을 업로드합니다. withCannedAcl(CannedAccessControlList.PublicRead)는 업로드된 파일에 대해 공개 읽기 권한을 부여합니다.
removeNewFile(File targetFile) 메서드는 업로드 과정에서 생성된 임시 파일을 삭제합니다.
convert(MultipartFile file) 메서드는 MultipartFile을 로컬 파일로 변환합니다. 변환된 파일은 Optional로 감싸져 반환됩니다.
이렇게 S3Uploader 클래스는 MultipartFile을 S3로 업로드하고 업로드된 파일의 S3 URL 주소를 반환하는 기능을 제공합니다.

 */