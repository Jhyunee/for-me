package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.CService;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateCServiceRequest {
    private String title;
    private String content;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalDateTime updatedAt;
}
