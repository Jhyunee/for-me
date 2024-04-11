package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.CService;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddCServiceRequest {
    private Long user_id;
    private String title;
    private String content;

    public CService toEntity() {
        return CService.builder()
                .user_id(user_id)
                .title(title)
                .content(content)
                .build();
    }
}
