package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
