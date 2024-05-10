package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Notification;
import me.forme.springdeveloper.dto.AddNotificationRequest;
import me.forme.springdeveloper.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class NotificationApiController {
    @Autowired
    private NotificationService notificationService;

    // 모든 알림글 조회
    @GetMapping("/notifications")
    public List<Notification> findAllNotifications(){
        return notificationService.findAll();
    }

    // 알림글 등록
    @PostMapping("/api/notifications")
    public ResponseEntity<Notification> addNotification(@RequestBody AddNotificationRequest request) {
        Notification savedNotification = notificationService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedNotification);
    }

    // 알림글 확인
    @PatchMapping("/api/notifications/{notiId}")
    public ResponseEntity<Notification> read(@PathVariable Long notiId) {
        Notification read = notificationService.read(notiId);
        return (read != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 알림글 삭제
    @DeleteMapping("/api/notifications/{notiId}")
    public ResponseEntity<Void> deleteService(@PathVariable long notiId) {
        notificationService.delete(notiId);

        return ResponseEntity.ok()
                .build();
    }

}
