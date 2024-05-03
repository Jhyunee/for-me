package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateChecklistRequest {
    private String name;
    private String user_id;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalDateTime updateAt;
    @Setter
    private String category;  // 카테고리 추가
}
