package me.forme.springdeveloper.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ColumnDefault("0")
    @Column(name = "reward")
    private Long reward;

    @ColumnDefault("0")
    @Column(name = "saved")
    private Long saving;

    @Builder
    Reward(String userId, String month, LocalDateTime createdAt){
        this.userId = userId;
        this.createdAt = createdAt;
        this.reward = 0L;
        this.saving = 0L;
    }

    public void update(Long reward, LocalDateTime dateTime) {
        this.reward = reward;
        this.createdAt = dateTime;
    }

    public void updateSaving(Long saving){
        this.saving = saving;
    }
}
