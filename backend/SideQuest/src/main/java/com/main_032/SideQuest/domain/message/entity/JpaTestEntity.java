package com.main_032.SideQuest.domain.message.entity;

import com.main_032.SideQuest.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;


// 테스트 연습용 엔티티

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class JpaTestEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String content;

    // enum
    @Enumerated(value = EnumType.STRING)
    private TestStatus status;

    public JpaTestEntity(String name, String content, TestStatus status) {
        this.name = name;
        this.content = content;
        this.status = status;
    }

    // 예시 메서드: 객체의 상태 변화를 시키는 책임을 엔티티에서 메서드로서 정의함
    public void changeBStatus() {
        if (this.status == TestStatus.B) {
            throw new IllegalArgumentException("이미 B 상태여서 변경할 수 없습니다.");
        }
        this.status = TestStatus.B;
    }

    public void updateName(String newName) {
        if (Objects.isNull(newName) || newName.isBlank()) {
            throw new IllegalArgumentException("이름은 비어있을 수 없습니다!");
        }
        this.name = newName;
    }

    public enum TestStatus{
        A,B
    }
}
