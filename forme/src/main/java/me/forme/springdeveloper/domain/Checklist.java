package me.forme.springdeveloper.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Checklist {

    //체크리스트 아이디
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    // @Setter
    @Column(name = "category")
    private String category;

    //사용자아이디
    @Column(name = "user_id", nullable = false)
    private String user_id;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "deleted_at") //통계 기능 위해 삭제된 날짜 칼럼 추가
    private LocalDate deletedAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime updatedAt;

    @Column(name = "done")
    private int done; //0: False, 1: True

    @Builder
    public Checklist(String name, String user_id, LocalDate createdAt, LocalTime updatedAt, String category) {
        this.name = name;
        this.user_id = user_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.category = category;
    }

    public void update(String name, String user_id, LocalTime updatedAt) {
        this.name = name;
        this.user_id = user_id;
        this.updatedAt = updatedAt;
    }

    public void delete(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public void check() {
        if (this.done == 0){
            this.done = 1;
        }
        else this.done = 0;
    }

}