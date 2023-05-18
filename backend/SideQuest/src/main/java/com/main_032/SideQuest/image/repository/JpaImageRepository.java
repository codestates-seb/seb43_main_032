package com.main_032.SideQuest.image.repository;

import com.main_032.SideQuest.image.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JpaImageRepository extends JpaRepository<ImageEntity, UUID> {

}
// JpaImageRepository: ImageEntity의 JPA 리포지토리 인터페이스입니다.
// UUID를 사용하여 이미지를 식별합니다.