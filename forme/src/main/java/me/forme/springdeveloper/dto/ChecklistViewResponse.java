package me.forme.springdeveloper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Getter
public class ChecklistViewResponse {
    private String name;
    private String user_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalTime updatedAt;
    private String categoty;

    public ChecklistViewResponse(Checklist checklist) {
        this.name = checklist.getName();
        this.user_id = checklist.getUser_id();
        this.createdAt = checklist.getCreatedAt();
        this.updatedAt = checklist.getUpdatedAt();
        // this.category = checklist.getCategory();
    }
}
