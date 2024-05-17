package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddDoneRequest {

    private Long checklistId;
    private LocalDate done_date;
    private String user_id;

}
