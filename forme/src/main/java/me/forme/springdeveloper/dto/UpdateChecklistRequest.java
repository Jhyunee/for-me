package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateChecklistRequest {
    private String name;
    private long user_id;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalDateTime updateAt;
}
