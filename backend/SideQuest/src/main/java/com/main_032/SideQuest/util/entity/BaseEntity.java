package com.main_032.SideQuest.util.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass  // 엔티티 공통 정의하기위한 슈퍼클래스 선언 어노테이션
public abstract class BaseEntity {
    @Column
    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    @LastModifiedDate
    private LocalDateTime updatedAt;
}