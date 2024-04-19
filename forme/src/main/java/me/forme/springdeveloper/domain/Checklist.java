package me.forme.springdeveloper.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "category")
    private String category;

    //사용자아이디
    @Column(name = "user_id", nullable = false)
    private String user_id;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDate createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime updatedAt;

    @Column(name = "done")
    private int done; //0: False, 1: True


    @Builder
    public Checklist(String name, String user_id, LocalDate createdAt, LocalTime updatedAt) {
        this.name = name;
        this.user_id = user_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void update(String name, String user_id, LocalTime updatedAt) {
        this.name = name;
        this.user_id = user_id;
        this.updatedAt = updatedAt;
    }

    public void check() {
        if (this.done == 0){
            this.done = 1;
        }
        else this.done = 0;
    }

}