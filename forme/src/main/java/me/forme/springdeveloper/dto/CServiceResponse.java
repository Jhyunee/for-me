package me.forme.springdeveloper.dto;

import lombok.Getter;
import me.forme.springdeveloper.domain.CService;

import java.time.LocalDateTime;

@Getter
public class CServiceResponse {
    private final String title;
    private final String content;
    private final String user_id;

    public CServiceResponse(CService service) {
        this.title = service.getTitle();
        this.content = service.getContent();
        this.user_id = service.getUser_id();
    }
}
