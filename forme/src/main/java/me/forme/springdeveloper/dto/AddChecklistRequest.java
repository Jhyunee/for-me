package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.forme.springdeveloper.domain.Checklist;
import org.springframework.format.annotation.DateTimeFormat;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddChecklistRequest {
    private String name;
    private String user_id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime updatedAt;
    @Setter
    private String category;  // 카테고리 추가

        public Checklist toEntity() {
        return Checklist.builder()
                .name(name)
                .user_id(user_id)
                .createdAt(LocalDate.now())
                .updatedAt(LocalTime.now())
                .category(category)
                .build();
    }

}
