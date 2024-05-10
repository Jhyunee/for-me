package me.forme.springdeveloper.dto;

import lombok.Getter;
import me.forme.springdeveloper.domain.Notification;

@Getter
public class NotificationResponse {
    private String notiTitle;
    private String notiContent;
    public NotificationResponse(Notification notification) {
        this.notiTitle = getNotiTitle();
        this.notiContent = getNotiContent();
    }
}
