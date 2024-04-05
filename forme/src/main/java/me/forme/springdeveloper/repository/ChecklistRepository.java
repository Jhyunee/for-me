package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
}
