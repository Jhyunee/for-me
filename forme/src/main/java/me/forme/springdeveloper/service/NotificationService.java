package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Notification;
import me.forme.springdeveloper.dto.AddNotificationRequest;
import me.forme.springdeveloper.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> findAll() {return notificationRepository.findAll();}

    public Notification save(AddNotificationRequest request) {
        return notificationRepository.save(request.toEntity());
    }

    public void delete(long id) {
        notificationRepository.deleteById(id);
    }

    @Transactional
    public Notification read(Long id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if(notification != null) {
            notification.read();
            notificationRepository.save(notification);
        }
        return notification;
    }

}
