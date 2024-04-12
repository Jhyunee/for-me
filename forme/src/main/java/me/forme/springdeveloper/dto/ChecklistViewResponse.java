package me.forme.springdeveloper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
public class ChecklistViewResponse {
    private String name;
    private Long user_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;

    public ChecklistViewResponse(Checklist checklist) {
        this.name = checklist.getName();
        this.user_id = checklist.getUser_id();
        this.createdAt = checklist.getCreatedAt();
        this.updatedAt = checklist.getUpdatedAt();
    }
}
