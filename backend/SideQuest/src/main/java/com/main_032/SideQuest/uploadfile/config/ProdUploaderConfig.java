package com.main_032.SideQuest.uploadfile.config;

import com.main_032.SideQuest.image.service.ImageUploadService;
import com.main_032.SideQuest.image.service.ImageUploader;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.uploadfile.service.S3Uploader;
import com.main_032.SideQuest.uploadfile.service.Uploader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@Profile("prod")
public class ProdUploaderConfig {
    private final MemberService memberService;
    public ProdUploaderConfig(MemberService memberService) {
        this.memberService = memberService;
    }
    @Bean
    public ImageUploader imageUploader() {
        // S3Uploader를 사용하여 ImageUploader 구현체를 생성하고 반환합니다.
        return new ImageUploadService(this.uploader(), memberService);
    }

    @Bean
    // S3Uploader를 생성하고 반환합니다. S3Uploader는 S3BucketConfig에서 생성한 AmazonS3 인스턴스를 사용합니다.
    public Uploader uploader() {
        return new S3Uploader(s3BucketConfig().amazonS3Client());
    }

    @Bean
    // S3BucketConfig를 생성하고 반환합니다.
    public S3BucketConfig s3BucketConfig() {
        return new S3BucketConfig();
    }

    @Bean
    // CommonsMultipartResolver를 생성하고 반환합니다.
    // 이를 통해 멀티파트 요청을 처리할 수 있습니다.
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(2000000000);// 최대 업로드 파일 크기를 설정합니다.
        return multipartResolver;

    }
}
/*
ProdUploaderConfig: 이 클래스는 프로덕션 환경에서 사용되는 업로더 구성을 정의합니다.
imageUploader() 메서드는 Uploader 인터페이스를 구현한 ImageUploadService 인스턴스를
 생성하고 반환합니다.
이때 uploader() 메서드에서 생성한 S3Uploader 인스턴스와 JpaImageRepository,
MemberService를 주입합니다.
uploader() 메서드는 S3Uploader 인스턴스를 생성하고 반환합니다.
 이때 s3BucketConfig() 메서드에서 생성한 AmazonS3 인스턴스를 사용합니다.
s3BucketConfig() 메서드는 S3BucketConfig 인스턴스를 생성하고 반환합니다.
이 인스턴스는 AWS S3 클라이언트를 구성하는 데 사용됩니다.
multipartResolver() 메서드는 CommonsMultipartResolver 인스턴스를 생성하고 반환합니다.
 이를 통해 멀티파트 요청을 처리할 수 있으며, 최대 업로드 파일 크기를 설정할 수 있습니다.
 */

