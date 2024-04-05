package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddChecklistRequest {
    private String name;
    private Long user_id;

    public Checklist toEntity() {
        return Checklist.builder()
                .name(name)
                .user_id(user_id)
                .build();
    }
}
