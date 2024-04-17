package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.ChecklistViewResponse;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
    List<Checklist> findByCreatedAt(LocalDateTime createdAt);

}
