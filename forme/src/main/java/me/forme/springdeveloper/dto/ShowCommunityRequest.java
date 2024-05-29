package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ShowCommunityRequest {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate select_date;
}
