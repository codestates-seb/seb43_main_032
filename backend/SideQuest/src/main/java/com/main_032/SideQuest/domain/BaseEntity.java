package com.main_032.SideQuest.domain;

import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

// 모든 엔티티에서 가지고 있는 속성을 공통 처리함
// 생성시간, 수정시간은 거의 모든 엔티티에 공통 속성이기 떄문에 기본 엔티티에서 설정하는것이 좋음
// 추상클래스로 선언한 이유는, 해당 클래스가 단독으로 인스턴스화 해서 사용될일이 없기 때문에
@Getter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass  // 엔티티 공통 정의하기위한 슈퍼클래스 선언 어노테이션
public abstract class BaseEntity {

    @Column
    @CreatedDate // 메인 애플리케이션에 선언한 @EnableJpaAuditing 과 같이 학습해보기
    private LocalDateTime createdAt;

    @Column
    @LastModifiedDate // 메인 애플리케이션에 선언한 @EnableJpaAuditing 과 같이 학습해보기
    private LocalDateTime updatedAt;
}
