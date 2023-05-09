package com.main_032.SideQuest.domain.message.entity;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class JpaTestEntityTest {

    @Test
    void 엔티티_상태변경_테스트_성공() {
        // given
        JpaTestEntity entity = new JpaTestEntity("name", "content", JpaTestEntity.TestStatus.A);

        // when
        entity.changeBStatus();

        // then
        assertThat(entity.getStatus()).isEqualTo(JpaTestEntity.TestStatus.B);
    }

    @Test
    void 엔티티_상태변경_테스트_실패() {
        // given
        JpaTestEntity entity = new JpaTestEntity("name", "content", JpaTestEntity.TestStatus.B);

        // when then
        assertThatThrownBy(() -> entity.changeBStatus())
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미 B 상태여서 변경할 수 없습니다.");
    }

    @Test
    void 엔티티_이름_변경_성공() {
        // given
        JpaTestEntity entity = new JpaTestEntity("name", "content", JpaTestEntity.TestStatus.B);
        String newName = "새로운 이름";

        // when
        entity.updateName(newName);

        // then
        assertThat(entity.getName()).isEqualTo(newName);
    }

    @ParameterizedTest
    @NullAndEmptySource
    void 엔티티_이름_널이거나_빈값인경우_변경_실패(String newName) {
        // given
        JpaTestEntity entity = new JpaTestEntity("name", "content", JpaTestEntity.TestStatus.B);

        // when then
        assertThatThrownBy(() -> entity.updateName(newName))
                .isInstanceOf(IllegalArgumentException.class);
    }

}