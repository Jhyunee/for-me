package me.forme.springdeveloper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ShowChecklistRequest {
    private String user_id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate select_date;
}
