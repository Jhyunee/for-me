package me.forme.springdeveloper.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "admin_id", nullable = false)
    private String admin_id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDate createdAt;

    @Builder Notice(Long id, String admin_id, String title, String content, LocalDate createdAt){
        this.id = id;
        this.admin_id = admin_id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}
