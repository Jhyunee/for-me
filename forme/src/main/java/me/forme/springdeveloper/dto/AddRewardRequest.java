package me.forme.springdeveloper.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Reward;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;

@Getter
@Setter
@NoArgsConstructor
public class AddRewardRequest {
    private String userId;
    private String createdAt;

    public Reward toEntity(String userId, String date) {
        return Reward.builder()
                .userId(userId)
                .createdAt(date)
                .build();
    }
}
