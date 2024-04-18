package me.forme.springdeveloper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddChecklistRequest {
    private String name;
    private Long user_id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime updatedAt;

        public Checklist toEntity() {
        return Checklist.builder()
                .name(name)
                .user_id(user_id)
                .createdAt(LocalDate.now())
                .updatedAt(LocalTime.now())
                .build();
    }
}
