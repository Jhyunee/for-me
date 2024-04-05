package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;


@Getter
public class ChecklistViewResponse {
    private String name;
    private Long user_id;

    public ChecklistViewResponse(Checklist checklist) {
        this.name = checklist.getName();
        this.user_id = checklist.getUser_id();
    }
}
