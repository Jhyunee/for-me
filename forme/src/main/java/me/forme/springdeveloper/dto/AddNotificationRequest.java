package me.forme.springdeveloper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.forme.springdeveloper.domain.Notification;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddNotificationRequest {
    private Long notiId;
    private String user_id;
    private String notiTitle;
    private String notiContent;
    private boolean isRead;
    private String notiCategory;

    public Notification toEntity() {
        return Notification.builder()
                .notiId(notiId)
                .user_id(user_id)
                .notiTitle(notiTitle)
                .notiContent(notiContent)
                .isRead(isRead)
                .notiCategory(notiCategory)
                .build();
    }
}
