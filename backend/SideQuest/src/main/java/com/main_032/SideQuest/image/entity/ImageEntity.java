package com.main_032.SideQuest.image.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Cacheable
public class ImageEntity {
    @Id @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID imageId;
    private String bucket;

    private String url;

}
//s3랑 연결되는 엔티티
//uuid가 무엇인가?
/*

위의 코드에서 UUID는 ImageEntity 클래스의 imageId 필드에 사용되었습니다. UUID를 사용하는 이유와 UUID의 역할에 대해 자세히 설명해드리겠습니다.
UUID는 Universally Unique Identifier(범용 고유 식별자)의 약자로, 고유한 식별자를 생성하기 위해 사용됩니다. UUID는 128비트 크기의 값으로,
일반적으로 16진수로 표현됩니다. 이를 통해 매우 낮은 확률로 중복되지 않는 고유한 식별자를 생성할 수 있습니다.

UUID를 사용하는 이유는 다음과 같습니다:
고유성: UUID는 거의 중복될 가능성이 없는 고유한 값을 생성합니다. 이는 분산 시스템에서 다중 노드 또는 다중 서비스 간에 고유한 키를 생성하는 데 유용합니다.
확장성: UUID는 중앙 데이터베이스나 별도의 공유 서비스를 사용하지 않고도 고유성을 보장합니다. 이는 시스템을 확장하거나 분산 시스템에서 동시성을 관리할 때 유용합니다.
보안성: UUID는 예측하기 어려운 무작위 값으로 생성됩니다. 따라서, 식별자를 추측하기 어렵고 보안적인 측면에서 안전합니다.
편의성: UUID는 생성할 때 추가적인 요구사항이 없으며, 어떤 컴퓨터에서도 고유성을 보장합니다. 이는 많은 프로그래밍 언어와 플랫폼에서 지원되어 개발자들에게 편의성을 제공합니다.
위의 코드에서 ImageEntity 클래스의 imageId 필드에 UUID를 사용함으로써, 각 이미지 객체에 고유한 식별자를 부여할 수 있습니다. 이를 통해 각 이미지를 고유하게 식별하고
조회, 수정, 삭제 등의 작업을 수행할 수 있습니다.

*/

// ImageEntity: S3와 연결되는 이미지 엔티티입니다.
// UUID를 사용하여 이미지의 고유 식별자를 생성합니다.

/*
        ImageController: 이미지 업로드를 처리하는 REST 컨트롤러입니다.
        /api/v1/images/profile 경로로 POST 요청을 받습니다.
        MultipartFile 형태의 이미지 파일과 사용자 정보(User 객체)를
        파라미터로 받아서 ImageUploader를 사용하여 이미지를 업로드합니다.
        업로드된 이미지의 URL을 ResponseEntity로 반환합니다.

        ImageEntity: S3와 연결되는 이미지 엔티티 클래스입니다.
        UUID를 사용하여 이미지의 고유 식별자를 생성하고, bucket과 url 속성을 가지고 있습니다.

        JpaImageRepository: ImageEntity의 JPA 리포지토리 인터페이스입니다.
        UUID를 사용하여 이미지를 식별합니다.

        ImageUploader: 이미지 업로드를 처리하는 서비스 인터페이스입니다.
        MultipartFile을 받아서 이미지를 업로드하고, URL을 반환하는 메소드가 정의되어 있습니다.

        ImageUploadService: 이미지 업로드를 처리하는 서비스 클래스입니다.
        Uploader를 사용하여 이미지를 업로드하고, JpaImageRepository를 사용하여
        이미지 정보를 저장합니다. 또한 MemberService를 통해 사용자 정보를 업데이트합니다.
        uploadImage 메소드는 이미지 파일과 사용자 이메일을 받아 해당 사용자의 프로필
        이미지로 업로드하고, 업로드된 이미지의 URL을 반환합니다.
        uploadImage 메소드는 이미지 파일을 받아 이미지를 업로드하고,
        업로드된 이미지의 URL과 버킷 정보를 문자열 배열로 반환합니다.
*/
