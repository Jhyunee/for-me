package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.CService;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddCServiceRequest {
    private String user_id;
    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime updatedAt;

    public CService toEntity() {
        return CService.builder()
                .user_id(user_id)
                .title(title)
                .content(content)
                .createdAt(LocalDate.now())
                .updatedAt(LocalTime.now())
                .build();
    }
}
