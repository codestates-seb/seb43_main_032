package com.main_032.SideQuest.uploadfile.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;


public class S3BucketConfig {
    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Bean
    public AmazonS3 amazonS3Client() {
        // AWS 자격 증명 생성
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        // Amazon S3 클라이언트 빌더를 사용하여 AmazonS3 인스턴스를 생성합니다.
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region)
                .build();
    }
}

       /*
        S3BucketConfig: 이 클래스는 AWS S3 클라이언트를 구성하는 데 사용됩니다.
        AmazonS3 인스턴스를 빈으로 정의합니다.
        accessKey와 secretKey는 @Value 애노테이션을 사용하여 외부 프로퍼티에서 가져옵니다.
         해당 프로퍼티는 AWS 자격 증명에 필요한 액세스 키와 비밀 액세스 키를 제공합니다.
        region은 Amazon S3 버킷이 있는 지역을 나타냅니다.
        amazonS3Client() 메서드는 AWS 자격 증명과 지정된 지역을 사용하여 AmazonS3 인스턴스를
         생성하고 반환합니다. 이 인스턴스는 AWS S3 서비스와의 상호 작용을 위해 사용됩니다.
        이 클래스는 AWS S3 버킷과 연결된 업로더(S3Uploader) 클래스에 필요한 AmazonS3 인스턴스를
        제공합니다.
        */
