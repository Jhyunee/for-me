package me.forme.springdeveloper.dto;

import lombok.Getter;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Notice;

@Getter
public class NoticeResponse {
    private final String title;
    private final String content;
    private final String admin_id;

    public NoticeResponse(Notice notice) {
        this.admin_id = getAdmin_id();
        this.title = getTitle();
        this.content = getContent();
    }
}
