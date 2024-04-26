package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
