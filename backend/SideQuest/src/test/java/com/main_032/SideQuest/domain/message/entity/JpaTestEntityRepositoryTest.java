package com.main_032.SideQuest.domain.message.entity;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class JpaTestEntityRepositoryTest {

    @Autowired
    private JpaTestEntityRepository jpaTestEntityRepository;

    @Test
    @DisplayName("테스트 엔티티 생성 JPA 테스트")
    public void testSaveUser() {
        // given - 테스트를 하기 위해 주어지는 데이터들
        JpaTestEntity entity = new JpaTestEntity("name", "content", JpaTestEntity.TestStatus.A);

        // when - when 절의 행동을 했을떄
        JpaTestEntity savedEntity = jpaTestEntityRepository.save(entity);

        // then - then 절에서 검증한다.
        assertThat(savedEntity.getId()).isEqualTo(1L);
        assertThat(savedEntity.getCreatedAt()).isNotNull();
        assertThat(savedEntity.getUpdatedAt()).isNotNull();
    }
}