package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Notice;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddNoticeRequest {
    private Long id;
    private String admin_id;
    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    public Notice toEntity() {
        return Notice.builder()
                .id(id)
                .admin_id(admin_id)
                .title(title)
                .content(content)
                .createdAt(LocalDate.now())
                .build();
    }
}
