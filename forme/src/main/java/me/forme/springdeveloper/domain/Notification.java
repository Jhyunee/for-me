package me.forme.springdeveloper.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notiId", updatable = false)
    private Long notiId;

    @Column(name = "user_id", nullable = false)
    private String user_id;

    @Column(name = "notiTitle")
    private String notiTitle;

    @Column(name = "notiContent")
    private String notiContent;

    @Column(name = "isRead")
    private boolean isRead;

    @Column(name = "notiCategory")
    private String notiCategory;

    @Builder Notification(Long notiId, String user_id, String notiTitle, String notiContent, boolean isRead, String notiCategory){
        this.notiId = notiId;
        this.user_id = user_id;
        this.notiTitle = notiTitle;
        this.notiContent = notiContent;
        this.isRead = isRead;
        this.notiCategory = notiCategory;

    }

    public void read() {
        this.isRead = !this.isRead;
    }
}
