package com.main_032.SideQuest.uploadfile.config;

import com.main_032.SideQuest.image.repository.JpaImageRepository;
import com.main_032.SideQuest.image.service.ImageUploadService;
import com.main_032.SideQuest.image.service.ImageUploader;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.uploadfile.service.LocalUploader;
import com.main_032.SideQuest.uploadfile.service.Uploader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@Profile("local")
public class LocalUploaderConfig {
   private final JpaImageRepository jpaImageRepository;
   private final MemberService memberService;

   public LocalUploaderConfig(JpaImageRepository jpaImageRepository, MemberService memberService) {
      this.jpaImageRepository = jpaImageRepository;
      this.memberService = memberService;
   }

   @Bean
   // LocalUploader를 사용하여 ImageUploader 구현체를 생성하고 반환합니다.
   public ImageUploader imageUploader() {
      return new ImageUploadService(this.uploader(), jpaImageRepository, memberService);
   }
   @Bean
   // LocalUploader를 생성하고 반환합니다.
   public Uploader uploader() {
      return new LocalUploader();
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

LocalUploaderConfig: 이 클래스는 로컬 환경에서 사용되는 업로더 구성을 정의합니다.
imageUploader() 메서드는 Uploader 인터페이스를 구현한 ImageUploadService
인스턴스를 생성하고 반환합니다. 이때 uploader() 메서드에서 생성한 LocalUploader
인스턴스와 JpaImageRepository, MemberService를 주입합니다.
uploader() 메서드는 LocalUploader 인스턴스를 생성하고 반환합니다.
로컬 파일 시스템에 업로드하는 업로더입니다.
multipartResolver() 메서드는 CommonsMultipartResolver 인스턴스를 생성하고 반환합니다.
 이를 통해 멀티파트 요청을 처리할 수 있으며, 최대 업로드 파일 크기를 설정할 수 있습니다.







 */
